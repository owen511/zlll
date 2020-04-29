/*
 * 
 * Copyright (c) 2004-2005 by Zapatec, Inc. http://www.zapatec.com 1700 MLK Way,
 * Berkeley, California, 94709, U.S.A. All rights reserved.
 * 
 * 
 */
Zapatec.treePath = Zapatec.getPath("Zapatec.Tree");

Zapatec.Tree = function() {
	var objArgs = {};
	switch (arguments.length) {
		case 1 :
			objArgs = arguments[0];
			break;
		case 2 :
			objArgs = arguments[1];
			objArgs.tree = arguments[0];
			break;
	}
	Zapatec.Tree.SUPERconstructor.call(this, objArgs);
};
Zapatec.Tree.id = "Zapatec.Tree";
Zapatec.Tree.all = {};
Zapatec.inherit(Zapatec.Tree, Zapatec.Widget);
Zapatec.Tree.prototype.init = function(config) {
	this.container = null;
	this.internalContainer = null;
	this.allNodes = [];
	this.id2Obj = {};
	this.rootNode = null;
	this.expandToLevelNum = 0;
	this.isClicked = false;
	this.isActive = false;
	this.editInline = null;
	this.isSaveStateDone = false;
	if (config.tree) {
		var tmp = Zapatec.Widget.getElementById(config.tree);
		if (tmp && tmp.id) {
			this.id = tmp.id;
		}
	}
	Zapatec.Tree.SUPERclass.init.call(this, config);
	Zapatec.Tree.all[this.id] = this;
	this.container = Zapatec.Utils.createElement("div", null,
			this.config.selectable);
	this.container.className = this.getClassName({
				prefix : "zpTree",
				suffix : "Container"
			});
	this.container.id = "zpTree" + this.id + "Container";
	this.internalContainer = Zapatec.Utils.createElement("div", null,
			this.config.selectable);
	this.internalContainer.className = "tree tree-top";
	this.container.appendChild(this.internalContainer);
	Zapatec.Utils.createProperty(this.container, "zpTree", this);
	if (this.config.initLevel) {
		this.expandToLevelNum = this.config.initLevel;
	}
	if (this.config.tree) {
		this.config.tree.parentNode.insertBefore(this.container,
				this.config.tree);
		Zapatec.Utils.destroy(this.config.tree);
	} else if (this.config.parent) {
		this.config.parent.appendChild(this.container);
	}
	this.rootNode = new Zapatec.Tree.Node({
				tree : this,
				parentNode : null,
				level : 0,
				isRootNode : true,
				eventListeners : this.config.eventListeners
			});
	this.id2Obj[this.id] = this.rootNode;
	this.rootNode.isCreated = true;
	this.rootNode.childrenContainer = this.internalContainer;
	this.prevSelected = null;
	this.loadData();
	if (this.prevSelected) {
		this.sync(this.prevSelected.id);
	}
	if (this.config.saveState) {
		var txt = Zapatec.Utils.getCookie("Zapatec.Tree-" + this.config.saveId);
		var node = this.getNode(txt, true);
		if (node) {
			this.isSaveStateDone = true;
			node.sync();
		}
	}
	if (this.config.editable) {
		if (Zapatec.EditInline) {
			var self = this;
			this.editInline = new Zapatec.EditInline({
						editAsText : this.config.editAsText,
						eventListeners : {
							showStart : function() {
								this.selectedNode = self.prevSelected;
							},
							saveContent : function(content) {
								if (this.selectedNode) {
									this.selectedNode.rename(content);
									this.selectedNode = null;
								}
							}
						}
					});
		} else {
			this.config.editable = false;
			Zapatec.Log({
				description : "Zapatec.EditInline class is not found. Please include 'utils/edit_inline.js' into page."
			});
		}
	}
	this.attachNavigation();
};
Zapatec.Tree.prototype.configure = function(objArgs) {
	this.defineConfigOption('tree');
	this.defineConfigOption('parent');
	this.defineConfigOption('hiliteSelectedNode');
	this.defineConfigOption('highlightSelectedNode', true);
	this.defineConfigOption('defaultIcons');
	this.defineConfigOption('compact', false);
	this.defineConfigOption('dynamic', false);
	this.defineConfigOption('initLevel', 1);
	this.defineConfigOption('deselectSelected', false);
	this.defineConfigOption('saveState', false);
	this.defineConfigOption('saveId');
	this.defineConfigOption('expandOnSignClick', true);
	this.defineConfigOption('expandOnSignDblclick', false);
	this.defineConfigOption('expandOnIconClick', true);
	this.defineConfigOption('expandOnIconDblclick', false);
	this.defineConfigOption('expandOnLabel');
	this.defineConfigOption('expandOnLabelClick', false);
	this.defineConfigOption('labelDblClick');
	this.defineConfigOption('expandOnLabelDblclick', false);
	this.defineConfigOption('selectMultiple', false);
	this.defineConfigOption('selectOnSignClick', true);
	this.defineConfigOption('selectOnSignDblclick', true);
	this.defineConfigOption('selectOnIconClick', true);
	this.defineConfigOption('selectOnIconDblclick', true);
	this.defineConfigOption('selectOnLabelClick', true);
	this.defineConfigOption('selectOnLabelDblclick', true);
	this.defineConfigOption('prevCompatible', false);
	this.defineConfigOption('quick', false);
	this.defineConfigOption('putBackReferences', false);
	this.defineConfigOption('createWholeDOM', false);
	this.defineConfigOption('jsonLoadCallback');
	this.defineConfigOption('keyboardNavigation', false);
	this.defineConfigOption('deselectOnLeave');
	this.defineConfigOption('putCheckboxes', false);
	this.defineConfigOption('dependantCheckboxes', true);
	this.defineConfigOption('selectable', false);
	this.defineConfigOption('editable', false);
	this.defineConfigOption('editAsText', true);
	this.defineConfigOption('editOnClick', false);
	this.defineConfigOption('editOnDblclick', true);
	this.defineConfigOption('disableContextMenu', false);
	Zapatec.Tree.SUPERclass.configure.call(this, objArgs);
	this.config.parent = Zapatec.Widget.getElementById(this.config.parent);
	this.config.tree = Zapatec.Widget.getElementById(this.config.tree);
	if (this.config.tree != null) {
		if (this.config.source == null) {
			this.config.source = this.config.tree;
		} else {
		}
	}
	if (typeof(this.config.hiliteSelectedNode) != 'undefined'
			&& this.config.hiliteSelectedNode != null) {
		this.config.highlightSelectedNode = this.config.hiliteSelectedNode;
	}
	if (this.config.parent == null && this.config.tree == null) {
		Zapatec.Log({
			description : "No 'parent' or 'tree' config options given. Unable to add tree."
		});
		throw ("No 'parent' or 'tree' config options given. Unable to add tree.");
	}
	if (this.config.labelDblClick != null) {
		this.config.expandOnLabelDblclick = this.config.labelDblClick;
	}
	if (this.config.expandOnLabel != null) {
		this.config.expandOnLabelClick = this.config.expandOnLabel;
	}
	if (this.config.initLevel == false) {
		this.config.initLevel = 1;
	}
	if (this.config.initLevel < 1) {
		this.config.initLevel = 1;
	}
	if (this.config.saveState
			&& (!this.config.saveId || typeof(this.config.saveId) != 'string' || this.config.saveId.length == 0)) {
		Zapatec.Log({
					description : "No 'saveId' is given. 'saveState' feature disabled."
				});
		this.config.saveState = false;
	}
	if (this.config.createWholeDOM && this.config.quick) {
		this.config.quick = false;
		Zapatec.Log({
			description : "Config option 'createWholeDOM' overrides 'quick' config option"
		});
	}
	if (this.config.selectMultiple) {
		this.config.keyboardNavigation = false;
	}
	if (this.config.keyboardNavigation
			&& typeof(this.config.deselectOnLeave) == 'undefined') {
		this.config.deselectOnLeave = true;
	}
	if (!this.config.putCheckboxes) {
		this.config.dependantCheckboxes = false;
	}
};
Zapatec.Tree.prototype.reconfigure = function(objArgs) {
	if (objArgs.theme) {
		Zapatec.Utils.removeClass(this.container, this.getClassName({
							prefix : "zpTree",
							suffix : "Container"
						}));
	}
	Zapatec.Tree.SUPERclass.reconfigure.call(this, objArgs);
	Zapatec.Utils.addClass(this.container, this.getClassName({
						prefix : "zpTree",
						suffix : "Container"
					}));
};
Zapatec.Tree.prototype.addStandardEventListeners = function() {
	Zapatec.Tree.SUPERclass.addStandardEventListeners.call(this);
	this.addEventListener('fetchSourceError', this.displayErrorSource);
};
Zapatec.Tree.prototype.displayErrorSource = function(oError) {
	alert("The tree's data source, " + this.config.source
			+ " does not contain valid data.\n" + oError.errorDescription);
};
Zapatec.Tree.prototype.find = function(findFunc) {
	for (var ii = 0; ii < this.allNodes.length; ii++) {
		if (findFunc(this.allNodes[ii])) {
			return this.allNodes[ii];
		}
	}
};
Zapatec.Tree.prototype.findAll = function(findFunc) {
	var result = [];
	for (var ii = 0; ii < this.allNodes.length; ii++) {
		if (findFunc(this.allNodes[ii])) {
			result.push(this.allNodes[ii]);
		}
	}
	return result;
};
Zapatec.Tree.prototype.toggleAll = function() {
	for (var ii = 0; ii < this.allNodes.length; ii++) {
		this.allNodes[ii].toggle();
	}
};
Zapatec.Tree.prototype.getNode = function(id, omitWarning) {
	var node = this.id2Obj[id];
	if (node == null) {
		if (!omitWarning) {
			Zapatec.Log({
						description : "No node found for id '" + id + "'"
					});
		}
		return;
	}
	return node;
};
Zapatec.Tree.prototype.sync = function(itemId) {
	var node = this.getNode(itemId);
	if (node) {
		node.sync();
	}
};
Zapatec.Tree.prototype.toggleItem = function(nodeId, state) {
	var node = this.getNode(nodeId);
	if (!node) {
		return;
	}
	if (state == true) {
		node.expand();
	} else if (state == false) {
		node.collapse();
	} else if (state == null) {
		node.toggle();
	}
};
Zapatec.Tree.prototype.appendChild = function(newChild, parent, atStart) {
	if (this.config.prevCompatible) {
		var tmp = parent;
		parent = newChild;
		newChild = tmp;
	}
	if (parent == null) {
		parent = this.rootNode;
	} else {
		parent = this.getNode(parent);
	}
	if (parent == null) {
		return null;
	}
	return parent.appendChild(newChild, atStart);
};
Zapatec.Tree.prototype.insertBefore = function(newChild, refChild) {
	refChild = this.getNode(refChild);
	if (refChild == null) {
		return null;
	}
	return refChild.insertBefore(newChild);
};
Zapatec.Tree.prototype.insertAfter = function(newChild, refChild) {
	refChild = this.getNode(refChild);
	if (refChild == null) {
		return null;
	}
	return refChild.insertAfter(newChild);
};
Zapatec.Tree.prototype.removeChild = function(oldChild) {
	oldChild = this.getNode(oldChild);
	if (oldChild == null) {
		return null;
	}
	oldChild.destroy();
};
Zapatec.Tree.prototype.collapseAll = function() {
	for (var ii = 0; ii < this.allNodes.length; ii++) {
		this.allNodes[ii].collapse();
	}
};
Zapatec.Tree.prototype.collapseToLevel = function(level) {
	for (var ii = 0; ii < this.allNodes.length; ii++) {
		if (this.allNodes[ii].config.level > level) {
			this.allNodes[ii].collapse();
		}
	}
};
Zapatec.Tree.prototype.expandAll = function() {
	for (var ii = 0; ii < this.allNodes.length; ii++) {
		this.allNodes[ii].expand();
	}
};
Zapatec.Tree.prototype.expandToLevel = function(level) {
	this.expandToLevelNum = level;
	for (var ii = 0; ii < this.allNodes.length; ii++) {
		if (this.allNodes[ii].config.level <= level) {
			this.allNodes[ii].expand();
		}
	}
};
Zapatec.Tree.prototype.loadDataJson = function(objResponse) {
	if (objResponse == null) {
		return null;
	}
	if (this.config.jsonLoadCallback) {
		objResponse = this.config.jsonLoadCallback(objResponse);
	}
	this.rootNode.data = {};
	this.rootNode.data.children = objResponse;
	this.rootNode.createChildren();
	for (var ii = 0; ii < this.rootNode.children.length; ii++) {
		this.rootNode.children[ii].afterCreate();
	}
	if (this.config.saveState && !this.isSaveStateDone) {
		var txt = Zapatec.Utils.getCookie("Zapatec.Tree-" + this.config.saveId);
		var node = this.getNode(txt, true);
		if (node) {
			this.isSaveStateDone = true;
			node.sync();
		}
	}
};
Zapatec.Tree.prototype.loadDataXml = function(objSource) {
	if (objSource == null || objSource.documentElement == null) {
		return null;
	}
	var result = [];
	for (var jj = 0; jj < objSource.documentElement.childNodes.length; jj++) {
		var tmp = Zapatec.Tree.Utils
				.convertXml2Json(objSource.documentElement.childNodes[jj]);
		if (tmp != null) {
			result.push(tmp);
		}
	}
	return this.loadDataJson(result);
};
Zapatec.Tree.prototype.loadDataHtml = function(objSource) {
	if (objSource == null) {
		return null;
	}
	var result = [];
	for (var jj = 0; jj < objSource.childNodes.length; jj++) {
		var tmp = Zapatec.Tree.Utils.convertLi2Json(objSource.childNodes[jj],
				this.config.prevCompatible);
		if (tmp != null) {
			result.push(tmp);
		}
	}
	return this.loadDataJson(result);
};
Zapatec.Tree.prototype.makeNode = function(html, type) {
	if (!type) {
		type = "li";
	}
	var node = Zapatec.Utils.createElement(type);
	if (html) {
		Zapatec.Transport.setInnerHtml({
					html : html,
					container : node
				});
	}
	return node;
};
Zapatec.Tree.prototype.destroy = function(leaveDOM) {
	this.rootNode.destroy(true);
	this.container.zpTree = null;
	Zapatec.Tree.all[this.id] = null;
	this.allNodes = null;
	this.rootNode = null;
	if (!leaveDOM) {
		Zapatec.Utils.destroy(this.container);
	}
	this.container = null;
	this.id2Obj = null;
	this.discard();
};
Zapatec.Tree.prototype.onItemSelect = function() {
};
Zapatec.Tree.prototype.getState = function() {
	var result = [];
	for (var ii = 0; ii < this.rootNode.children.length; ii++) {
		result.push(this.rootNode.children[ii].getState());
	}
	return result;
};
Zapatec.Tree.prototype.getParent = function(id, mode) {
	return id;
};
Zapatec.Tree.prototype.attachNavigation = function() {
	var self = this;
	Zapatec.Utils.addEvent(this.container, "click", function() {
				self.isActive = true;
				self.isClicked = true;
			});
	Zapatec.Utils.addEvent(document, (Zapatec.is_ie ? "keydown" : "keypress"),
			function(evt) {
				return self.keyEvent(evt);
			});
	Zapatec.Utils.addEvent(document, 'click', function() {
				if (!self.isClicked) {
					self.leave();
				}
				self.isClicked = false;
			});
};
Zapatec.Tree.prototype.keyEvent = function(evt) {
	if (!this.prevSelected || !this.isActive) {
		return true;
	}
	if (!evt) {
		evt = window.event;
	}
	if (!this.config.keyboardNavigation && !this.config.editable) {
		return;
	}
	var res = Zapatec.Utils.getCharFromEvent(evt);
	this.fireEvent("keypressed", res.charCode, res.chr);
	if (res.charCode == 27) {
		this.leave();
	}
	if (res.chr == " ") {
		res.charCode = 32;
	}
	if (this.config.keyboardNavigation
			&& (!this.config.editable || this.config.editable
					&& !this.editInline && !this.editInline.selectedNode)) {
		switch (res.charCode) {
			case 32 :
				if (this.config.putCheckboxes) {
					this.prevSelected.checkboxChanged();
				}
			case 13 :
				this.prevSelected.toggle();
				Zapatec.Utils.stopEvent(evt);
				break;
			case 63234 :
			case 37 :
				if (this.prevSelected.data.isExpanded) {
					this.prevSelected.collapse();
				} else {
					if (!this.prevSelected.config.parentNode.isRootNode) {
						this.prevSelected.config.parentNode.select();
					}
				}
				break;
			case 63235 :
			case 39 :
				if (!this.prevSelected.data.isExpanded) {
					this.prevSelected.expand();
				} else {
					if (this.prevSelected.children != null
							&& this.prevSelected.children.length > 0) {
						this.prevSelected.children[0].select();
					}
				}
				break;
			case 63232 :
			case 38 :
				var prevNode = Zapatec.Tree.Utils
						.getPrevNode(this.prevSelected);
				if (prevNode) {
					prevNode.select();
					Zapatec.Utils.stopEvent(evt);
				}
				break;
			case 63233 :
			case 40 :
				var nextNode = Zapatec.Tree.Utils
						.getNextNode(this.prevSelected);
				if (nextNode) {
					nextNode.select();
					Zapatec.Utils.stopEvent(evt);
				}
				break;
		}
	}
	if (this.config.editable && this.editInline.selectedNode) {
		if (res.charCode == 9) {
			var otherNode = null;
			if (evt.shiftKey) {
				otherNode = Zapatec.Tree.Utils
						.getPrevNode(this.editInline.selectedNode);
			} else {
				otherNode = Zapatec.Tree.Utils
						.getNextNode(this.editInline.selectedNode);
			}
			if (otherNode) {
				this.editInline.saveAndHide();
				otherNode.select();
				this.editInline.show(otherNode.getLinkToLabelElement());
				Zapatec.Utils.stopEvent(evt);
			}
		}
	}
};
Zapatec.Tree.prototype.leave = function() {
	if (this.prevSelected && this.config.deselectOnLeave) {
		this.prevSelected.deselect();
	}
	this.isActive = false;
	this.fireEvent("leave");
};
Zapatec.Tree.Node = function(objArgs) {
	Zapatec.Tree.Node.SUPERconstructor.call(this, objArgs);
};
Zapatec.Tree.Node.id = "Zapatec.Tree.Node";
Zapatec.inherit(Zapatec.Tree.Node, Zapatec.Widget);
Zapatec.Tree.Node.prototype.configure = function(objArgs) {
	this.defineConfigOption('theme', null);
	this.defineConfigOption('tree', null);
	this.defineConfigOption('parentNode', null);
	this.defineConfigOption('level');
	this.defineConfigOption('isRootNode', false);
	Zapatec.Tree.Node.SUPERclass.configure.call(this, objArgs);
	if (this.config.tree == null) {
		Zapatec.Log({
			description : "No reference to parent Zapatec.Tree instance! Aborting."
		});
		throw ("No reference to parent Zapatec.Tree instance! Aborting.");
	}
};
Zapatec.Tree.Node.prototype.init = function(config) {
	this.expandedIcon = null;
	this.collapsedIcon = null;
	this.fetchingIcon = null;
	this.elementIcon = null;
	this.isCreated = false;
	this.isChildrenCreated = false;
	this.isFetching = false;
	this.data = null;
	this.children = [];
	this.labelContainer = null;
	this.iconElement = null;
	this.signElement = null;
	this.childrenContainer = null;
	this.checkboxContainer = null;
	this.oldSource = null;
	this.oldSourceType = null;
	Zapatec.Tree.Node.SUPERclass.init.call(this, config);
	if (!this.config.isRootNode) {
		this.config.tree.allNodes.push(this);
	}
	this.loadData();
	this.config.source = null;
	this.config.sourceType = null;
	if (!this.config.isRootNode) {
		if (this.data.attributes && this.data.attributes['class']) {
			var md = null;
			if (md = this.data.attributes['class']
					.match(/zpLoad(JSON|HTML|XML)=([^ $]*)/)) {
				this.data.source = md[2];
				if (md[1] == "JSON") {
					this.data.sourceType = "json/url";
				} else if (md[1] == "HTML") {
					this.data.sourceType = "html/url";
				} else if (md[1] == "XML") {
					this.data.sourceType = "xml/url";
				} else {
					this.data.source = null;
					this.data.sourceType = null;
				}
			}
		}
		if (this.data.source) {
			if (this.data.children == null || this.data.loadAlways) {
				this.data.children = [];
			}
			this.config.source = this.data.source;
			this.config.sourceType = this.data.sourceType;
		}
	}
};
Zapatec.Tree.Node.prototype.addStandardEventListeners = function() {
	Zapatec.Tree.Node.SUPERclass.addStandardEventListeners.call(this);
	this.addEventListener('fetchSourceStart', function() {
				this.isFetching = true;
				this.putIcons();
			});
	this.addEventListener("fetchSourceEnd", function() {
				this.isFetching = false;
				this.putIcons();
			});
	var tmpFunc = function() {
		if (this.data && this.data.loadAlways) {
			for (var ii = this.children.length - 1; ii >= 0; ii--) {
				this.children[ii].destroy(true);
			}
			this.data.children = [];
			if (this.childrenContainer) {
				this.childrenContainer.innerHTML = "";
			}
		}
	};
	this.addEventListener('loadDataStart', tmpFunc);
	this.addEventListener('fetchSourceStart', tmpFunc);
	this.addEventListener('loadDataEnd', function() {
				this.oldSource = this.config.source;
				this.oldSourceType = this.config.sourceType;
				this.config.source = null;
				this.config.sourceType = null;
				if (!this.config.isRootNode && this.data.isExpanded) {
					this.expand();
				}
				if (this.data && this.data.loadAlways) {
					this.config.source = this.oldSource;
					this.config.sourceType = this.oldSourceType;
				}
			});
	this.addEventListener("fetchSourceError", function(objError) {
		if (this.data && this.data.loadAlways) {
			this.config.source = this.oldSourceType;
			this.config.sourceType = this.oldSourceType;
		}
		Zapatec.Log({
					description : "Error happend while retrieving branch content: "
							+ objError.errorCode
							+ " "
							+ objError.errorDescription
				});
	});
};
Zapatec.Tree.Node.prototype.create = function() {
	if (this.isCreated || this.data == null || this.config.isRootNode) {
		return null;
	}
	this.fireEvent("beforeCreate");
	var content = [];
	content.push("<div class='tree-item");
	content.push(this.hasSubtree() ? " tree-item-more " : "");
	content.push("'");
	this.labelContainerId = "zpTree" + this.config.tree.id + "Node" + this.id
			+ "LabelContainer";
	content.push(" id='");
	content.push(this.labelContainerId);
	content.push("'>");
	content
			.push("<table class='tree-table' cellpadding='0' cellspacing='0'><tbody><tr>");
	if (this.hasSubtree()) {
		content.push("<td id='");
		content.push("zpTree");
		content.push(this.config.tree.id);
		content.push("Node");
		content.push(this.id);
		content.push("SignElement");
		content.push("'");
		content.push(" onclick='Zapatec.Widget.callMethod(");
		content.push(this.id);
		content.push(", \"onSignClick\")'");
		content.push(" ondblclick='Zapatec.Widget.callMethod(");
		content.push(this.id);
		content.push(", \"onSignDblclick\")'");
		content.push(" class='tgb ");
		content.push(this.data.isExpanded ? "minus" : "plus");
		content.push("'>");
		content.push("<img src='");
		content.push(Zapatec.zapatecPath);
		content.push("discovery/zpempty.gif' class='tgb' alt=''/>");
		content.push("</td>");
	}
	if (this.config.tree.config.defaultIcons
			|| (this.hasSubtree()
					&& (this.data.collapsedIcon || this.data.expandedIcon || this.data.fetchingIcon) || !this
					.hasSubtree()
					&& this.data.elementIcon)) {
		content.push("<td");
		content.push(" id='zpTree");
		content.push(this.config.tree.id);
		content.push("Node");
		content.push(this.id);
		content.push("IconElement'");
		content.push(" onclick='Zapatec.Widget.callMethod(");
		content.push(this.id);
		content.push(", \"onIconClick\")'");
		content.push(" ondblclick='Zapatec.Widget.callMethod(");
		content.push(this.id);
		content.push(", \"onIconDblclick\")'");
		content.push(" oncontextmenu='return Zapatec.Widget.callMethod(");
		content.push(this.id);
		content.push(", \"onIconContextMenu\", event)'");
		content.push(" onmouseup='return Zapatec.Widget.callMethod(");
		content.push(this.id);
		content.push(", \"onIconMouseup\", event)'");
		content.push(" class='icon ");
		if (this.config.tree.config.defaultIcons) {
			content.push(this.config.tree.config.defaultIcons);
		}
		content.push("'>");
		if (this.data.collapsedIcon || this.data.expandedIcon
				|| this.data.fetchingIcon || this.data.elementIcon) {
			if (this.hasSubtree()) {
				if (this.data.expandedIcon) {
					content.push(this.data.expandedIcon);
				}
				if (this.data.collapsedIcon) {
					content.push(this.data.collapsedIcon);
				}
				if (this.data.fetchingIcon) {
					content.push(this.data.fetchingIcon);
				}
			} else {
				content.push(this.data.elementIcon);
			}
		} else {
			content.push("<img src='");
			content.push(Zapatec.zapatecPath);
			content.push("discovery/zpempty.gif' class='icon' alt=''/>");
		}
		content.push("</td>");
	}
	if (this.config.tree.config.putCheckboxes) {
		content.push("<td");
		content.push(" id='zpTree");
		content.push(this.config.tree.id);
		content.push("Node");
		content.push(this.id);
		content.push("CheckboxElement'");
		content.push(" onclick='Zapatec.Widget.callMethod(");
		content.push(this.id);
		content.push(", \"checkboxChanged\")'");
		content.push(" class='checkboxContainer ");
		content.push(this.data.isChecked
				? "checkboxChecked"
				: "checkboxUnchecked")
		content.push("'>");
		content.push("<img src='");
		content.push(Zapatec.zapatecPath);
		content.push("discovery/zpempty.gif' class='checkboxContainer' alt=''/>");
		content.push("</td>");
	}
	var attributes = Zapatec.Utils.clone(this.data.attributes);
	if (!attributes) {
		attributes = {
			"id" : "zpTree" + this.config.tree.id + "Node" + this.id
					+ "LabelElement",
			"onclick" : "Zapatec.Widget.callMethod(" + this.id
					+ ", \"onLabelClick\")",
			"ondblclick" : "Zapatec.Widget.callMethod(" + this.id
					+ ", \"onLabelDblclick\")",
			"oncontextmenu" : "return Zapatec.Widget.callMethod(" + this.id
					+ ", \"onLabelContextMenu\", event)",
			"onmouseup" : "Zapatec.Widget.callMethod(" + this.id
					+ ", \"onLabelMouseup\", event)",
			"class" : "label " + (this.data.children ? "menutitle" : "submenu")
		};
	} else {
		if (attributes.id == null) {
			attributes.id = "zpTree" + this.config.tree.id + "Node" + this.id
					+ "LabelElement";
		}
		if (attributes['class'] != null) {
			attributes['class'] += " label "
					+ (this.data.children ? "menutitle" : "submenu");
		} else {
			attributes['class'] = "label "
					+ (this.data.children ? "menutitle" : "submenu");
		}
		if (attributes.onclick != null) {
			attributes.onclick = "Zapatec.Widget.callMethod(" + this.id
					+ ", \"onLabelClick\");" + this.data.attributes.onclick;
		} else {
			attributes.onclick = "Zapatec.Widget.callMethod(" + this.id
					+ ", \"onLabelClick\");";
		}
		if (attributes.ondblclick != null) {
			attributes.ondblclick = "Zapatec.Widget.callMethod(" + this.id
					+ ", \"onLabelDblclick\");"
					+ this.data.attributes.ondblclick;
		} else {
			attributes.ondblclick = "Zapatec.Widget.callMethod(" + this.id
					+ ", \"onLabelDblclick\");";
		}
		if (attributes.oncontextmenu != null) {
			attributes.oncontextmenu = "return Zapatec.Widget.callMethod("
					+ this.id + ", \"onLabelContextMenu\", event);"
					+ this.data.attributes.oncontextmenu;
		} else {
			attributes.oncontextmenu = "return Zapatec.Widget.callMethod("
					+ this.id + ", \"onLabelContextMenu\", event);";
		}
		if (attributes.onmouseup != null) {
			attributes.onmouseup = "Zapatec.Widget.callMethod(" + this.id
					+ ", \"onLabelMouseup\", event);"
					+ this.data.attributes.onmouseup;
		} else {
			attributes.onmouseup = "Zapatec.Widget.callMethod(" + this.id
					+ ", \"onLabelMouseup\", event);";
		}
	}
	content.push("<td");
	if (Zapatec.is_ie) {
		content.push(" unselectable='on'");
	}
	for (var attrName in attributes) {
		var tmp = attributes[attrName];
		if (typeof(tmp) != 'string') {
			tmp += "";
		}
		if (tmp) {
			var attrVal = tmp.replace(/'/g, "\\'");
			content.push(" " + attrName + "='" + attrVal + "'");
		}
	}
	content.push(">");
	if (this.config.tree.config.prevCompatible) {
		content.push("<span class='label'>");
	}
	if (this.data.label) {
		content.push(this.data.label);
	}
	if (this.config.tree.config.prevCompatible) {
		content.push("</span>");
	}
	content.push("</td></tr></tbody></table></div>");
	if (this.data.isSelected) {
		this.select();
	}
	if (this.hasSubtree()) {
		content.push("<div class='tree' id='");
		content.push("zpTree");
		content.push(this.config.tree.id);
		content.push("Node");
		content.push(this.id);
		content.push("ChildrenContainer");
		content.push("'");
		content.push("></div>");
	}
	this.fireEvent("afterCreate");
	return content.join("");
};
Zapatec.Tree.Node.prototype.hasSubtree = function() {
	return this.data.children != null;
};
Zapatec.Tree.Node.prototype.afterCreate = function() {
	if (this.isCreated) {
		return false;
	}
	this.labelContainer = document.getElementById(this.labelContainerId);
	if (this.data.collapsedIcon || this.data.expandedIcon
			|| this.data.fetchingIcon || this.data.elementIcon) {
		this.iconElement = this.labelContainer.childNodes[0].childNodes[0].childNodes[0].childNodes[1];
	}
	if (this.hasSubtree()) {
		this.signElement = this.iconElement
				? this.iconElement.previousSibling
				: this.labelContainer.childNodes[0].childNodes[0].childNodes[0].childNodes[0];
		this.childrenContainer = this.labelContainer.nextSibling;
	}
	if (this.config.tree.config.putBackReferences
			&& this.getLinkToLabelElement()) {
		Zapatec.Utils.createProperty(this.labelElement, "zpTreeNode", this);
	}
	if (this.data.collapsedIcon || this.data.expandedIcon
			|| this.data.fetchingIcon || this.data.elementIcon) {
		if (this.iconElement && this.iconElement.childNodes.length != 0) {
			var tmp = [this.iconElement.childNodes[0],
					this.iconElement.childNodes[1],
					this.iconElement.childNodes[2]];
			if (this.hasSubtree()) {
				for (var ii = 0; ii < 2; ii++) {
					var tmpIcon = tmp[ii];
					if (!tmpIcon) {
						continue;
					}
					if (tmpIcon.className.indexOf("collapsedIcon") >= 0) {
						this.collapsedIcon = tmpIcon;
					} else if (tmpIcon.className.indexOf("expandedIcon") >= 0) {
						this.expandedIcon = tmpIcon;
					} else if (tmpIcon.className.indexOf("fetchingIcon") >= 0) {
						this.fetchingIcon = tmpIcon;
					}
				}
			} else {
				this.elementIcon = tmp[0];
			}
			this.putIcons();
		}
	}
	this.isCreated = true;
	this.putLines();
	if (this.data.isExpanded
			|| this.config.tree.expandToLevelNum > this.config.level) {
		this.expand();
	} else {
		this.collapse();
	}
	if (this.config.tree.config.putCheckboxes) {
		var tmp = this.labelContainer.childNodes[0].childNodes[0].childNodes[0];
		this.checkboxContainer = tmp.childNodes[tmp.childNodes.length - 2];
	}
	if (this.data.isSelected) {
		this.select();
	}
	if (this.config.tree.config.createWholeDOM) {
		this.createChildren();
	}
};
Zapatec.Tree.Node.prototype.getLinkToLabelElement = function() {
	if (this.config.isRootNode) {
		return null;
	}
	if (this.labelElement) {
		return this.labelElement;
	}
	this.labelElement = this.labelContainer.childNodes[0].childNodes[0].childNodes[0].lastChild;
	return this.labelElement;
};
Zapatec.Tree.Node.prototype.createChildren = function() {
	if (!this.hasSubtree() || this.hasSubtree()
			&& this.isChildrenCreated == true) {
		return null;
	}
	if (this.config.tree.config.quick || this.config.isRootNode) {
		this.initChildren();
	}
	var content = [];
	for (var ii = 0; ii < this.children.length; ii++) {
		content.push(this.children[ii].create());
	}
	Zapatec.Transport.setInnerHtml({
				html : content.join(""),
				container : this.childrenContainer
			});
	this.isChildrenCreated = true;
	if (this.config.tree.config.createWholeDOM) {
		for (var ii = 0; ii < this.children.length; ii++) {
			this.children[ii].afterCreate();
		}
	}
};
Zapatec.Tree.Node.prototype.initChildren = function() {
	if (!this.data.children) {
		return null;
	}
	for (var ii = 0; ii < this.data.children.length; ii++) {
		this.children.push(new Zapatec.Tree.Node({
					tree : this.config.tree,
					parentNode : this,
					level : this.config.level + 1,
					source : this.data.children[ii],
					sourceType : "json",
					eventListeners : this.config.eventListeners
				}));
	}
};
Zapatec.Tree.Node.prototype.isFirstNodeInBranch = function() {
	return this.config.isRootNode
			|| this.labelContainer.parentNode.firstChild == this.labelContainer;
};
Zapatec.Tree.Node.prototype.isLastNodeInBranch = function() {
	return this.config.isRootNode
			|| this.labelContainer.parentNode.lastChild == this.labelContainer
			|| this.labelContainer.parentNode.lastChild == this.childrenContainer;
};
Zapatec.Tree.Node.prototype.checkboxChanged = function(value) {
	if (typeof (value) == "undefined") {
		value = !this.data.isChecked;
	}
	this.data.isChecked = value;
	if (this.isCreated) {
		this.checkboxContainer.className = "checkboxContainer " + (this.data.isChecked ? "checkboxChecked" : "checkboxUnchecked");
	}
	if (this.hasSubtree() && this.config.tree.config.dependantCheckboxes) {
		var toCheck = this.data.isChecked;
		//wy
		if(toCheck){
			this.expand();
		}else{
			this.collapse();
		}
		for (var ii = 0; ii < this.children.length; ii++) {
			this.children[ii].checkboxChanged(toCheck);
		}
	}
	if (this.config.parentNode && !this.config.parentNode.config.isRootNode) {
		this.config.parentNode.updateCheckbox();
	}
};
Zapatec.Tree.Node.prototype.updateCheckbox = function() {
	if (this.config.isRootNode) {
		return;
	}
	if (!this.config.tree.config.dependantCheckboxes) {
		return;
	}
	var stats = this.getChildrenStats();
	if (stats.hasChecked && !stats.hasUnchecked) {
		this.data.isChecked = true;
		if (this.isCreated) {
			this.checkboxContainer.className = "checkboxContainer checkboxChecked";
		}
	} else if (stats.hasChecked && stats.hasUnchecked) {
		this.data.isChecked = null;
		if (this.isCreated) {
			this.checkboxContainer.className = "checkboxContainer checkboxHalfChecked";
		}
	} else if (!stats.hasChecked && stats.hasUnchecked) {
		this.data.isChecked = false;
		if (this.isCreated) {
			this.checkboxContainer.className = "checkboxContainer checkboxUnchecked";
		}
	}
	if (this.config.parentNode && !this.config.parentNode.config.isRootNode) {
		this.config.parentNode.updateCheckbox();
	}
};
Zapatec.Tree.Node.prototype.getChildrenStats = function() {
	var res = {
		hasChecked : false,
		hasUnchecked : false
	}
	if (this.hasSubtree() && this.data.children.length > 0) {
		for (var ii = 0; ii < this.children.length; ii++) {
			var stats = this.children[ii].getChildrenStats();
			res.hasChecked = res.hasChecked || stats.hasChecked;
			res.hasUnchecked = res.hasUnchecked || stats.hasUnchecked;
			if (res.hasChecked && res.hasUnchecked) {
				break;
			}
		}
	} else {
		res.hasChecked = this.data.isChecked;
		res.hasUnchecked = !this.data.isChecked;
	}
	return res;
}
Zapatec.Tree.Node.prototype.putLines = function() {
	if (this.config.isRootNode) {
		return null;
	}
	this.labelContainer.className = this.labelContainer.className.replace(
			/tree-lines-./, "");
	if (this.isFirstNodeInBranch()) {
		if (this.isLastNodeInBranch()) {
			if (this.config.level == 1) {
				this.labelContainer.className += " tree-lines-s";
			} else {
				this.labelContainer.className += " tree-lines-b";
			}
		} else {
			if (this.config.level == 1) {
				this.labelContainer.className += " tree-lines-t";
			} else {
				this.labelContainer.className += " tree-lines-c";
			}
		}
	} else if (this.isLastNodeInBranch()) {
		this.labelContainer.className += " tree-lines-b";
	} else {
		this.labelContainer.className += " tree-lines-c";
	}
	if (this.hasSubtree()) {
		if (this.isLastNodeInBranch()) {
			this.childrenContainer.className = this.childrenContainer.className
					.replace(/\btree-lined\b/, "");
		} else {
			this.childrenContainer.className += " tree-lined";
		}
	}
};
Zapatec.Tree.Node.prototype.putIcons = function() {
	if (!this.isCreated) {
		return null;
	}
	if (this.expandedIcon || this.collapsedIcon || this.fetchingIcon
			|| this.elementIcon) {
		if (this.fetchingIcon) {
			this.fetchingIcon.style.display = this.isFetching
					? "block"
					: "none";
		}
		if (this.expandedIcon) {
			this.expandedIcon.style.display = !this.data.isExpanded
					|| this.isFetching ? "none" : "block";
		}
		if (this.collapsedIcon) {
			this.collapsedIcon.style.display = this.data.isExpanded
					|| this.isFetching ? "none" : "block";
		}
	}
	if (this.signElement) {
		if (this.isFetching) {
			this.signElement.className = this.signElement.className.replace(
					/\b(plus|minus)\b/, "fetching");
		} else if (this.data.isExpanded) {
			this.signElement.className = this.signElement.className.replace(
					/\b(plus|fetching)\b/, "minus");
		} else {
			this.signElement.className = this.signElement.className.replace(
					/\b(minus|fetching)\b/, "plus");
		}
	}
};
Zapatec.Tree.Node.prototype.onIconClick = function() {
	this.fireEvent("iconClick");
	if (this.config.tree.config.selectOnIconClick) {
		if (this.config.tree.config.deselectSelected && this.data.isSelected) {
			this.deselect();
		} else {
			this.select();
		}
	}
	if (!this.config.tree.config.expandOnIconClick) {
		return null;
	}
	this.toggle();
};
Zapatec.Tree.Node.prototype.onIconDblclick = function() {
	this.fireEvent("iconDblclick");
	if (this.config.tree.config.selectOnIconDblclick) {
		if (this.config.tree.config.deselectSelected && this.data.isSelected) {
			this.deselect();
		} else {
			this.select();
		}
	}
	if (!this.config.tree.config.expandOnIconDblclick) {
		return null;
	}
	this.toggle();
};
Zapatec.Tree.Node.prototype.onIconContextMenu = function() {
	return !this.config.tree.config.disableContextMenu;
}
Zapatec.Tree.Node.prototype.onIconMouseup = function(ev) {
	if (!ev) {
		ev = window.event;
	}
	if (Zapatec.Tree.Utils.isRightClick(ev)) {
		this.fireEvent("labelRightClick", ev);
		Zapatec.Utils.stopEvent(ev);
		ev.returnValue = true;
		return false;
	}
}
Zapatec.Tree.Node.prototype.onSignClick = function() {
	this.fireEvent("signClick");
	if (this.config.tree.config.selectOnSignClick) {
		if (this.config.tree.config.deselectSelected && this.data.isSelected) {
			this.deselect();
		} else {
			this.select();
		}
	}
	if (!this.config.tree.config.expandOnSignClick) {
		return null;
	}
	this.toggle();
};
Zapatec.Tree.Node.prototype.onSignDblclick = function() {
	this.fireEvent("signDblclick");
	if (this.config.tree.config.selectOnSignDblclick) {
		if (this.config.tree.config.deselectSelected && this.data.isSelected) {
			this.deselect();
		} else {
			this.select();
		}
	}
	if (!this.config.tree.config.expandOnSignDblclick) {
		return null;
	}
	this.toggle();
};
Zapatec.Tree.Node.prototype.onLabelClick = function() {
	this.fireEvent("labelClick");
	if (this.config.tree.config.selectOnLabelClick) {
		if (this.config.tree.config.deselectSelected && this.data.isSelected) {
			this.deselect();
		} else {
			this.select();
		}
	}
	if (this.config.tree.config.editable && this.config.tree.config.editOnClick) {
		this.config.tree.editInline.show(this.getLinkToLabelElement());
	}
	if (!this.config.tree.config.expandOnLabelClick) {
		return null;
	}
	this.toggle();
};
Zapatec.Tree.Node.prototype.onLabelDblclick = function() {
	this.fireEvent("labelDblclick");
	if (this.config.tree.config.selectOnLabelDblclick) {
		if (this.config.tree.config.deselectSelected && this.data.isSelected) {
			this.deselect();
		} else {
			this.select();
		}
	}
	if (this.config.tree.config.editable
			&& this.config.tree.config.editOnDblclick) {
		this.config.tree.editInline.show(this.getLinkToLabelElement());
	}
	if (!this.config.tree.config.expandOnLabelDblclick) {
		return null;
	}
	this.toggle();
};
Zapatec.Tree.Node.prototype.onLabelContextMenu = function() {
	return !this.config.tree.config.disableContextMenu;
}
Zapatec.Tree.Node.prototype.onLabelMouseup = function(ev) {
	if (!ev) {
		ev = window.event;
	}
	if (Zapatec.Tree.Utils.isRightClick(ev)) {
		this.fireEvent("labelRightClick", ev);
		Zapatec.Utils.stopEvent(ev);
		ev.returnValue = true;
		return false;
	}
}
Zapatec.Tree.Node.prototype.select = function() {
	if (this.config.isRootNode) {
		return null;
	}
	if (!this.config.tree.config.selectMultiple) {
		if (this.config.tree.prevSelected) {
			this.config.tree.prevSelected.deselect();
		}
	}
	this.data.isSelected = true;
	this.config.tree.prevSelected = this;
	if (this.config.tree.config.saveState) {
		Zapatec.Utils.writeCookie("Zapatec.Tree-"
						+ this.config.tree.config.saveId, this.data.attributes
						&& this.data.attributes.id
						? this.data.attributes.id
						: this.id, null, '/', 7);
	}
	if (this.isCreated && this.config.tree.config.highlightSelectedNode) {
		Zapatec.Utils.addClass(this.labelContainer, "tree-item-selected");
	}
	this.fireEvent("select");
	if (this.config.tree.onItemSelect) {
		this.config.tree.onItemSelect(this.data && this.data.attributes
				&& this.data.attributes.id ? this.data.attributes.id : this.id);
	}
};
Zapatec.Tree.Node.prototype.deselect = function() {
	if (this.config.isRootNode || !this.data.isSelected) {
		return null;
	}
	if (this.isCreated) {
		this.labelContainer.className = this.labelContainer.className.replace(
				/\btree-item-selected\b/, "");
	}
	this.data.isSelected = false;
	this.config.tree.prevSelected = null;
	this.fireEvent("deselect");
};
Zapatec.Tree.Node.prototype.collapse = function() {
	this.data.isExpanded = false;
	if (!this.isCreated || !this.hasSubtree()) {
		return null;
	}
	this.childrenContainer.style.display = 'none';
	if (!this.config.isRootNode) {
		this.labelContainer.className = this.labelContainer.className.replace(
				/\btree-item-expanded\b/, "");
		this.labelContainer.className += " tree-item-collapsed";
		this.putIcons();
	}
	this.fireEvent("collapse");
};
Zapatec.Tree.Node.prototype.collapseBranch = function() {
	if (!this.children) {
		return null;
	}
	for (var ii = 0; ii < this.children.length; ii++) {
		this.children[ii].collapseBranch();
	}
	this.collapse();
	this.fireEvent("collapseBranch");
};
Zapatec.Tree.Node.prototype.expand = function() {
	this.data.isExpanded = true;
	if (this.config.tree.config.compact) {
		var parentNodes = [];
		var parentNode = this;
		while (parentNode != null && !parentNode.config.isRootNode) {
			parentNodes.push(parentNode);
			parentNode = parentNode.config.parentNode;
		}
		for (var ii = this.config.tree.allNodes.length - 1; ii >= 0; ii--) {
			var node = this.config.tree.allNodes[ii];
			if (node.data && node.data.isExpanded) {
				var isParent = false;
				for (var jj = parentNodes.length - 1; jj >= 0; jj--) {
					if (node == parentNodes[jj]) {
						isParent = true;
						break;
					}
				}
				if (!isParent) {
					node.collapse();
				}
			}
		}
	}
	if (!this.isCreated || !this.hasSubtree()) {
		return null;
	}
	if (!this.config.isRootNode) {
		this.labelContainer.className = this.labelContainer.className.replace(
				/\btree-item-collapsed\b/, "");
		this.labelContainer.className += " tree-item-expanded";
		this.putIcons();
	}
	if (this.config.quick || this.children.length == 0) {
		if (this.config.source) {
			if (!this.isFetching) {
				this.loadData();
			}
		} else {
			this.childrenContainer.style.display = 'block';
			this.createChildren();
			for (var ii = 0; ii < this.children.length; ii++) {
				if (!this.children[ii].isCreated) {
					this.children[ii].afterCreate();
				}
			}
		}
	} else {
		this.childrenContainer.style.display = 'block';
		this.createChildren();
		for (var ii = 0; ii < this.children.length; ii++) {
			if (!this.children[ii].isCreated) {
				this.children[ii].afterCreate();
			}
		}
		if (this.config.source) {
			if (!this.isFetching) {
				this.loadData();
			}
		}
	}
	this.fireEvent("expand");
};
Zapatec.Tree.Node.prototype.expandBranch = function() {
	if (!this.children) {
		return null;
	}
	for (var ii = 0; ii < this.children.length; ii++) {
		this.children[ii].expandBranch();
	}
	this.expand();
	this.fireEvent("expandBranch");
};
Zapatec.Tree.Node.prototype.toggle = function() {
	this.fireEvent("toggle");
	if (this.data.isExpanded) {
		return this.collapse();
	} else {
		return this.expand();
	}
};
Zapatec.Tree.Node.prototype.loadDataJson = function(objResponse) {
	if (objResponse == null) {
		return null;
	}
	if (objResponse.expandedIcon) {
		objResponse.expandedIcon = Zapatec.Tree.Utils.addIconClass(
				objResponse.expandedIcon, "expandedIcon");
	}
	if (objResponse.collapsedIcon) {
		objResponse.collapsedIcon = Zapatec.Tree.Utils.addIconClass(
				objResponse.collapsedIcon, "collapsedIcon");
	}
	if (objResponse.fetchingIcon) {
		objResponse.fetchingIcon = Zapatec.Tree.Utils.addIconClass(
				objResponse.fetchingIcon, "fetchingIcon");
	}
	if (objResponse.elementIcon) {
		objResponse.elementIcon = Zapatec.Tree.Utils.addIconClass(
				objResponse.elementIcon, "elementIcon");
	}
	if (this.isCreated
			&& (!this.config.tree.config.quick || this.config.tree.config.quick
					&& this.isChildrenCreated)) {
		if (objResponse.children) {
			for (var ii = 0; ii < objResponse.children.length; ii++) {
				this.appendChild(objResponse.children[ii]);
			}
		}
	} else {
		if (this.data == null) {
			this.data = objResponse;
		} else {
			if (objResponse.children) {
				this.data.children = this.data.children
						.concat(objResponse.children);
			} else {
				this.data.children = objResponse.children;
			}
			this.updateCheckbox();
		}
		if (!this.config.tree.config.quick || this.config.isRootNode) {
			this.initChildren();
		}
		if (this.data.attributes && this.data.attributes.id) {
			this.config.tree.id2Obj[this.data.attributes.id] = this;
		} else {
			this.config.tree.id2Obj[this.id] = this;
		}
	}
};
Zapatec.Tree.Node.prototype.loadDataXml = function(objSource) {
	if (objSource == null || objSource.documentElement == null) {
		return null;
	}
	if (objSource.documentElement.tagName.toLowerCase() == "list") {
		var arr = [];
		for (var jj = 0; jj < objSource.documentElement.childNodes.length; jj++) {
			try {
				var tmp = Zapatec.Tree.Utils
						.convertXml2Json(objSource.documentElement.childNodes[jj]);
			} catch (e) {
			}
			if (tmp != null) {
				arr.push(tmp);
			}
		}
		this.loadDataJson({
					children : arr
				});
	} else {
		this.loadDataJson(Zapatec.Tree.Utils
				.convertXml2Json(objSource.documentElement));
	}
};
Zapatec.Tree.Node.prototype.loadDataHtml = function(objSource) {
	if (objSource == null || !objSource.nodeName) {
		return null;
	}
	if (objSource.nodeName.toLowerCase() == 'ul') {
		var arr = [];
		for (var ii = 0; ii < objSource.childNodes.length; ii++) {
			var tmp = Zapatec.Tree.Utils.convertLi2Json(
					objSource.childNodes[ii],
					this.config.tree.config.prevCompatible);
			if (tmp != null) {
				arr.push(tmp);
			}
		}
		this.loadDataJson({
					children : arr
				});
	} else {
		this.loadDataJson(Zapatec.Tree.Utils.convertLi2Json(objSource,
				this.config.tree.config.prevCompatible));
	}
};
Zapatec.Tree.Node.prototype.showContainer = function() {
};
Zapatec.Tree.Node.prototype.hideContainer = function() {
};
Zapatec.Tree.Node.prototype.expandHere = function() {
	if (this.config.isRootNode) {
		return null;
	}
	var parentNodes = [];
	var parentNode = this.config.parentNode;
	while (parentNode != null) {
		parentNodes.push(parentNode);
		parentNode = parentNode.config.parentNode;
	}
	for (var ii = parentNodes.length - 1; ii >= 0; ii--) {
		parentNodes[ii].expand();
	}
};
Zapatec.Tree.Node.prototype.sync = function() {
	if (this.config.isRootNode) {
		return null;
	}
	this.expandHere();
	this.select();
};
Zapatec.Tree.Node.prototype.destroy = function(quick) {
	if (this.isCreated && !quick) {
		Zapatec.Utils.destroy(this.labelContainer);
		if (this.hasSubtree()) {
			Zapatec.Utils.destroy(this.childrenContainer);
		}
	}
	if (this.children) {
		for (var ii = this.children.length - 1; ii >= 0; ii--) {
			this.children[ii].destroy(true);
		}
	}
	if (this.config.isRootNode) {
		return;
	}
	var childIndex = null;
	var childrenArray = this.config.parentNode.children;
	for (var ii = 0; ii < childrenArray.length; ii++) {
		if (childrenArray[ii] == this) {
			childIndex = ii;
			break;
		}
	}
	if (childIndex == null) {
	} else {
		if (childIndex != 0 && childrenArray[childIndex - 1].isCreated) {
			childrenArray[childIndex - 1].putLines();
		}
		if (childIndex != childrenArray.length - 1
				&& childrenArray[childIndex + 1].isCreated) {
			childrenArray[childIndex + 1].putLines();
		}
		childrenArray = childrenArray.slice(0, childIndex).concat(childrenArray
				.slice(childIndex + 1));
		this.config.parentNode.children = childrenArray;
	}
	for (var ii = 0; ii < this.config.tree.allNodes.length; ii++) {
		if (this.config.tree.allNodes[ii] == this) {
			childIndex = ii;
			break;
		}
	}
	if (childIndex == null) {
	} else {
		this.config.tree.allNodes = this.config.tree.allNodes.slice(0,
				childIndex).concat(this.config.tree.allNodes.slice(childIndex
				+ 1));
	}
	if (this.data.attributes && this.data.attributes.id) {
		this.config.tree.id2Obj[this.data.attributes.id] = null;
	} else {
		this.config.tree.id2Obj[this.id] = null;
	}
	if (this.config.tree.prevSelected == this) {
		this.config.tree.prevSelected = null;
	}
	if (this.config.parentNode) {
		this.config.parentNode.updateCheckbox();
	}
};
Zapatec.Tree.Node.prototype.addNode = function(newChild, insertPosition) {
	if (newChild != null && newChild.nodeType && newChild.nodeType == 1
			&& newChild.nodeName.toLowerCase() == "li") {
		newChild = Zapatec.Tree.Utils.convertLi2Json(newChild,
				this.config.tree.config.prevCompatible);
	}
	if (newChild == null) {
		Zapatec.Log({
					description : "No data given!"
				});
		return null;
	}
	var resultNode = newChild;
	this.data.children.splice(insertPosition, 0, newChild);
	if (this.isCreated || !this.config.tree.quick) {
		resultNode = new Zapatec.Tree.Node({
					tree : this.config.tree,
					parentNode : this,
					level : this.config.level + 1,
					source : newChild,
					sourceType : "json",
					eventListeners : this.config.eventListeners
				});
		if (this.isChildrenCreated) {
			var prevNode = null;
			var nextNode = null;
			var insertBeforeElement = null;
			if (insertPosition != 0) {
				prevNode = this.children[insertPosition - 1];
			}
			if (insertPosition != this.children.length) {
				nextNode = this.children[insertPosition];
				insertBeforeElement = nextNode.labelContainer;
			}
			var tmp = document.createElement("SPAN");
			Zapatec.Transport.setInnerHtml({
						html : resultNode.create(),
						container : tmp
					});
			var nodes = [];
			for (var ii = 0; ii < tmp.childNodes.length; ii++) {
				nodes.push(tmp.childNodes[ii]);
			}
			if (insertBeforeElement) {
				for (var ii = 0; ii < nodes.length; ii++) {
					this.childrenContainer.insertBefore(nodes[ii],
							insertBeforeElement);
				}
			} else {
				for (var ii = 0; ii < nodes.length; ii++) {
					this.childrenContainer.appendChild(nodes[ii]);
				}
			}
			resultNode.afterCreate();
			if (prevNode) {
				prevNode.putLines();
			}
			if (nextNode) {
				nextNode.putLines();
			}
		}
		this.children.splice(insertPosition, 0, resultNode);
	}
	this.updateCheckbox();
	if (this.config.parentNode) {
		this.config.parentNode.updateCheckbox();
	}
	return resultNode;
};
Zapatec.Tree.Node.prototype.appendChild = function(newChild, atStart) {
	if (atStart) {
		return this.addNode(newChild, 0);
	} else {
		return this.addNode(newChild, this.children.length);
	}
};
Zapatec.Tree.Node.prototype.insertBefore = function(newChild) {
	for (var ii = this.config.parentNode.children.length - 1; ii >= 0; ii--) {
		if (this == this.config.parentNode.children[ii]) {
			return this.config.parentNode.addNode(newChild, ii);
		}
	}
};
Zapatec.Tree.Node.prototype.insertAfter = function(newChild) {
	for (var ii = this.config.parentNode.children.length - 1; ii >= 0; ii--) {
		if (this == this.config.parentNode.children[ii]) {
			return this.config.parentNode.addNode(newChild, ii + 1);
		}
	}
};
Zapatec.Tree.Node.prototype.getState = function() {
	var result = {
		label : this.data.label,
		isSelected : this.data.isSelected,
		attributes : Zapatec.Utils.clone(this.data.attributes),
		isChecked : this.data.isChecked
	};
	if (this.isCreated && !this.config.isRootNode) {
		result.label = this.getLinkToLabelElement().innerHTML;
	}
	if (this.hasSubtree()) {
		result.isExpanded = this.data.isExpanded;
		result.source = this.config.source;
		result.sourceType = this.config.sourceType;
		result.expandedIcon = this.data.expandedIcon;
		result.collapsedIcon = this.data.collapsedIcon;
		result.fetchingIcon = this.data.fetchingIcon;
		result.children = [];
		for (var ii = 0; ii < this.children.length; ii++) {
			result.children.push(this.children[ii].getState());
		}
	} else {
		result.elementIcon = this.data.elementIcon;
	}
	return result;
};
Zapatec.Tree.Node.prototype.rename = function(newLabel) {
	this.fireEvent("rename", this.data.label, newLabel);
	this.data.label = newLabel;
	var labelElement = this.getLinkToLabelElement();
	Zapatec.Transport.setInnerHtml({
				html : newLabel,
				container : labelElement
			});
};
Zapatec.Tree.Utils = {};
Zapatec.Tree.Utils.convertLi2Json = function(liNode, compat) {
	if (liNode == null || liNode.nodeType != 1
			|| liNode.nodeName.toLowerCase() != 'li') {
		return null;
	}
	var struct = {
		attributes : {}
	};
	var ul = null;
	var expandedIcon = null;
	var collapsedIcon = null;
	var fetchingIcon = null;
	var icon = null;
	var labelEl = document.createElement("span");
	var cNodes = [];
	for (var ii = 0; ii < liNode.childNodes.length; ii++) {
		cNodes.push(liNode.childNodes[ii]);
	}
	for (var ii = 0; ii < cNodes.length; ii++) {
		var node = cNodes[ii];
		if (node.nodeType == 1) {
			if (node.nodeName.toLowerCase() == 'img') {
				if (compat) {
					if (icon == null) {
						icon = node;
					}
					if (expandedIcon == null) {
						expandedIcon = node;
						Zapatec.Utils.addClass(expandedIcon, "expandedIcon");
						continue;
					} else if (collapsedIcon == null) {
						collapsedIcon = node;
						Zapatec.Utils.addClass(collapsedIcon, "collapsedIcon");
						continue;
					}
					if (icon == node) {
						continue;
					}
				} else {
					if (/\belementIcon\b/.test(node.className)) {
						icon = node;
						continue;
					} else if (/\bexpandedIcon\b/.test(node.className)) {
						expandedIcon = node;
						continue;
					} else if (/\bcollapsedIcon\b/.test(node.className)) {
						collapsedIcon = node;
						continue;
					} else if (/\bfetchingIcon\b/.test(node.className)) {
						fetchingIcon = node;
						continue;
					}
				}
			}
			if (node.nodeName.toLowerCase() == 'ul') {
				ul = node;
				continue;
			}
		}
		var appendNode = node;
		if (Zapatec.is_ie && node.nodeType == 1
				&& node.nodeName.toLowerCase() == "script") {
			appendNode = node;
		} else {
			appendNode = node.cloneNode(true);
		}
		labelEl.appendChild(appendNode);
	}
	if (Zapatec.is_khtml) {
		var allChildren = labelEl.all ? labelEl.all : labelEl
				.getElementsByTagName("*");
		for (var ii = 0; ii < allChildren.length; ii++) {
			var child = allChildren[ii];
			for (var jj = 0; jj < child.attributes.length; jj++) {
				var attr = child.attributes[jj];
				child.setAttribute(attr.nodeName, attr.nodeValue.replace(/"/g,
								"'"));
			}
		}
	}
	struct['label'] = labelEl.innerHTML;
	if (Zapatec.is_opera) {
		struct['label'] = struct['label'].replace(/\\"/g, "'");
	}
	struct['isSelected'] = liNode.className.match(/\bselected\b/) != null;
	struct['isExpanded'] = liNode.className.match(/\bexpanded\b/) != null;
	struct['loadAlways'] = liNode.className.match(/\bzpLoadAlways\b/) != null;
	for (var ii = 0; ii < liNode.attributes.length; ii++) {
		var attr = liNode.attributes[ii];
		if (Zapatec.is_ie && liNode.getAttributeNode(attr.nodeName)
				&& !liNode.getAttributeNode(attr.nodeName).specified) {
			continue;
		}
		struct['attributes'][attr.nodeName.toLowerCase()] = attr.nodeValue;
	}
	if (ul == null) {
		if (icon) {
			Zapatec.Utils.addClass(icon, "elementIcon");
			var tmpIcon = document.createElement("SPAN");
			tmpIcon.appendChild(icon);
			struct['elementIcon'] = tmpIcon.innerHTML;
		}
	} else {
		if (expandedIcon) {
			var tmpIcon = document.createElement("SPAN");
			tmpIcon.appendChild(expandedIcon);
			struct['expandedIcon'] = tmpIcon.innerHTML;
		}
		if (collapsedIcon) {
			var tmpIcon = document.createElement("SPAN");
			tmpIcon.appendChild(collapsedIcon);
			struct['collapsedIcon'] = tmpIcon.innerHTML;
		}
		if (fetchingIcon) {
			var tmpIcon = document.createElement("SPAN");
			tmpIcon.appendChild(fetchingIcon);
			struct['fetchingIcon'] = tmpIcon.innerHTML;
		}
		struct['children'] = [];
		for (var ii = 0; ii < ul.childNodes.length; ii++) {
			var tmp = Zapatec.Tree.Utils.convertLi2Json(ul.childNodes[ii],
					compat);
			if (tmp != null) {
				struct['children'].push(tmp);
			}
		}
	}
	return struct;
};
Zapatec.Tree.Utils.xml2dom = function(node) {
	if (node.nodeType == 3) {
		return document.createTextNode(node.nodeValue);
	}
	if (node.nodeType != 1) {
		return null;
	}
	var el = Zapatec.Utils.createElement(node.nodeName);
	for (var ii = 0; ii < node.attributes.length; ii++) {
		var attr = node.attributes[ii];
		if (attr.name.toLowerCase() == "class") {
			el.className = node.getAttribute(attr.name);
		} else {
			el.setAttribute(attr.name, node.getAttribute(attr.name));
		}
	}
	if (node.hasChildNodes()) {
		for (var ii = 0; ii < node.childNodes.length; ii++) {
			var childNode = Zapatec.Tree.Utils.xml2dom(node.childNodes[ii]);
			if (childNode != null) {
				el.appendChild(childNode);
			}
		}
	}
	return el;
};
Zapatec.Tree.Utils.convertXml2Json = function(itemNode) {
	if (itemNode == null || itemNode.nodeType != 1
			|| itemNode.nodeName.toLowerCase() != 'item') {
		return null;
	}
	var struct = {
		content : null,
		attributes : {}
	};
	var list = null;
	var labelEl = document.createElement("span");
	for (var ii = 0; ii < itemNode.childNodes.length; ii++) {
		var node = itemNode.childNodes[ii];
		if (node.nodeType != 1) {
			continue;
		}
		if (node.nodeName.toLowerCase() == "attribute"
				&& node.getAttribute("name")) {
			struct.attributes[node.getAttribute("name")] = Zapatec.is_ie
					? node.childNodes[0].nodeValue
					: node.textContent;
			continue;
		}
		if (node.nodeName.toLowerCase() == 'list') {
			list = node;
			continue;
		}
		if (node.nodeName.toLowerCase() == 'label') {
			for (var jj = 0; jj < node.childNodes.length; jj++) {
				labelEl.insertBefore(Zapatec.Tree.Utils
								.xml2dom(node.childNodes[jj]),
						labelEl.firstChild);
			}
			continue;
		}
	}
	struct['label'] = labelEl.innerHTML;
	struct['isSelected'] = itemNode.getAttribute("isSelected") == "true";
	struct['isExpanded'] = itemNode.getAttribute("isExpanded") == "true";
	struct['loadAlways'] = itemNode.getAttribute("loadAlways") == "true";
	struct['source'] = itemNode.getAttribute("source");
	struct['sourceType'] = itemNode.getAttribute("sourceType");
	if (list == null) {
		struct['elementIcon'] = itemNode.getAttribute("elementIcon");
	} else {
		struct['collapsedIcon'] = itemNode.getAttribute("collapsedIcon");
		struct['expandedIcon'] = itemNode.getAttribute("expandedIcon");
		struct['fetchingIcon'] = itemNode.getAttribute("fetchingIcon");
		struct['children'] = [];
		for (var ii = 0; ii < list.childNodes.length; ii++) {
			var tmp = Zapatec.Tree.Utils.convertXml2Json(list.childNodes[ii]);
			if (tmp != null) {
				struct['children'].push(tmp);
			}
		}
	}
	return struct;
};
Zapatec.Tree.Utils.getNodeIndex = function(node) {
	if (!node || !node.config || !node.config.parentNode
			|| !node.config.parentNode.children) {
		return null;
	}
	for (var ii = 0; ii < node.config.parentNode.children.length; ii++) {
		if (node.config.parentNode.children[ii] == node) {
			return ii;
		}
	}
};
Zapatec.Tree.Utils.getPrevNode = function(prevSelected) {
	var index = Zapatec.Tree.Utils.getNodeIndex(prevSelected);
	if (index == null) {
		return;
	}
	var prevNode = null;
	if (index > 0) {
		prevNode = prevSelected.config.parentNode.children[index - 1];
		while (prevNode.hasSubtree() && prevNode.data.isExpanded) {
			prevNode = prevNode.children[prevNode.children.length - 1];
		}
	} else if (!prevSelected.config.parentNode.config.isRootNode) {
		prevNode = prevSelected.config.parentNode;
	}
	return prevNode;
};
Zapatec.Tree.Utils.getNextNode = function(prevSelected) {
	var index = Zapatec.Tree.Utils.getNodeIndex(prevSelected);
	if (index == null) {
		return;
	}
	var nextNode = null;
	if (prevSelected.hasSubtree() && prevSelected.data.isExpanded
			&& prevSelected.children.length > 0) {
		nextNode = prevSelected.children[0];
	} else if (index < prevSelected.config.parentNode.children.length - 1) {
		nextNode = prevSelected.config.parentNode.children[index + 1];
	} else if (!prevSelected.config.parentNode.config.isRootNode) {
		nextNode = prevSelected.config.parentNode;
		index = Zapatec.Tree.Utils.getNodeIndex(nextNode);
		while (index == nextNode.config.parentNode.children.length - 1) {
			nextNode = nextNode.config.parentNode;
			if (nextNode.config.isRootNode) {
				return;
			}
			index = Zapatec.Tree.Utils.getNodeIndex(nextNode);
		}
		nextNode = nextNode.config.parentNode.children[index + 1];
	}
	return nextNode;
};
Zapatec.Tree.Utils.addIconClass = function(str, className) {
	if (!str || !className) {
		return str;
	}
	var md = str.match(/( class=['"])/i);
	if (md) {
		return str.replace(/( class=['"])/i, "$1" + className + " ");
	} else {
		return str.replace(/^<img/, "<img class='" + className + "'");
	}
};
Zapatec.Tree.Utils.isRightClick = function(ev) {
	if (!ev) {
		ev = window.event;
	}
	if (!ev) {
		return false;
	}
	var button = ev.button ? ev.button : ev.which
	return (button > 1 || button == 1
			&& (Zapatec.is_opera || Zapatec.is_khtml && ev.metaKey));
};
Zapatec.Utils.addEvent(window, 'load', Zapatec.Utils.checkActivation);

Zapatec.Tree.Node.prototype.expandBranchs = function() {
	if (!this.children) {
		return null;
	}
	this.expand();
	for (var ii = 0; ii < this.children.length; ii++) {
		this.children[ii].expandBranchs();
	}
	this.fireEvent("expandBranchs");
};
