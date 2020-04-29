// jQuery List DragSort v0.4
// Website: http://dragsort.codeplex.com/
// License: http://dragsort.codeplex.com/license

(function(JQ) {

	JQ.fn.dragsort = function(options) {
		var opts = JQ.extend({}, JQ.fn.dragsort.defaults, options);
		var lists = [];
		var list = null, lastPos = null;
		if (this.selector)
			JQ("head").append("<style type='text/css'>" + (this.selector.split(",").join(" " + opts.dragSelector + ",") + " " + opts.dragSelector) + " { cursor: pointer; }</style>");

		this.each(function(i, cont) {

			if (JQ(cont).is("table") && JQ(cont).children().size() == 1 && JQ(cont).children().is("tbody"))
				cont = JQ(cont).children().get(0);

			var newList = {
				draggedItem: null,
				placeHolderItem: null,
				pos: null,
				offset: null,
				offsetLimit: null,
				scroll: null,
				container: cont,

				init: function() {
					if(!JQ(this.container).attr("data-listIdx")){
						JQ(this.container).attr("data-listIdx", i).mousedown(this.grabItem).find(opts.dragSelector).css("cursor", "pointer");
						JQ(this.container).children(opts.itemSelector).each(function(j) { JQ(this).attr("data-itemIdx", j); });
					}
				},

				grabItem: function(e) {
					if (e.which != 1 || JQ(e.target).is(opts.dragSelectorExclude))
						return;

					var elm = e.target;
					while (!JQ(elm).is("[data-listIdx='" + JQ(this).attr("data-listIdx") + "'] " + opts.dragSelector)) {
						if (elm == this) return;
						elm = elm.parentNode;
					}

					if (list != null && list.draggedItem != null)
						list.dropItem();

					JQ(e.target).css("cursor", "move");

					list = lists[JQ(this).attr("data-listIdx")];
					list.draggedItem = JQ(elm).closest(opts.itemSelector);
					var mt = parseInt(list.draggedItem.css("marginTop"));
					var ml = parseInt(list.draggedItem.css("marginLeft"));
					list.offset = list.draggedItem.offset();
					list.offset.top = e.pageY - list.offset.top + (isNaN(mt) ? 0 : mt) - 1;
					list.offset.left = e.pageX - list.offset.left + (isNaN(ml) ? 0 : ml) - 1;

					if (!opts.dragBetween) {
						var containerHeight = JQ(list.container).outerHeight() == 0 ? Math.max(1, Math.round(0.5 + JQ(list.container).children(opts.itemSelector).size() * list.draggedItem.outerWidth() / JQ(list.container).outerWidth())) * list.draggedItem.outerHeight() : JQ(list.container).outerHeight();
						list.offsetLimit = JQ(list.container).offset();
						list.offsetLimit.right = list.offsetLimit.left + JQ(list.container).outerWidth() - list.draggedItem.outerWidth();
						list.offsetLimit.bottom = list.offsetLimit.top + containerHeight - list.draggedItem.outerHeight();
					}

					var h = list.draggedItem.height();
					var w = list.draggedItem.width();
					var orig = list.draggedItem.attr("style");
					list.draggedItem.attr("data-origStyle", orig ? orig : "");
					if (opts.itemSelector == "tr") {
						list.draggedItem.children().each(function() { JQ(this).width(JQ(this).width()); });
						list.placeHolderItem = list.draggedItem.clone().attr("data-placeHolder", true);
						list.draggedItem.after(list.placeHolderItem);
						list.placeHolderItem.children().each(function() { JQ(this).css({ borderWidth:0, width: JQ(this).width() + 1, height: JQ(this).height() + 1 }).html("&nbsp;"); });
					} else {
						list.draggedItem.after(opts.placeHolderTemplate);
						list.placeHolderItem = list.draggedItem.next().css({ height: h, width: w }).attr("data-placeHolder", true);
					}
					list.draggedItem.css({ position: "absolute", opacity: 0.8, "z-index": 999, height: h, width: w });

					JQ(lists).each(function(i, l) { l.createDropTargets(); l.buildPositionTable(); });

					list.scroll = { moveX: 0, moveY: 0, maxX: JQ(document).width() - JQ(window).width(), maxY: JQ(document).height() - JQ(window).height() };
					list.scroll.scrollY = window.setInterval(function() {
						if (opts.scrollContainer != window) {
							JQ(opts.scrollContainer).scrollTop(JQ(opts.scrollContainer).scrollTop() + list.scroll.moveY);
							return;
						}
						var t = JQ(opts.scrollContainer).scrollTop();
						if (list.scroll.moveY > 0 && t < list.scroll.maxY || list.scroll.moveY < 0 && t > 0) {
							JQ(opts.scrollContainer).scrollTop(t + list.scroll.moveY);
							list.draggedItem.css("top", list.draggedItem.offset().top + list.scroll.moveY + 1);
						}
					}, 10);
					list.scroll.scrollX = window.setInterval(function() {
						if (opts.scrollContainer != window) {
							JQ(opts.scrollContainer).scrollLeft(JQ(opts.scrollContainer).scrollLeft() + list.scroll.moveX);
							return;
						}
						var l = JQ(opts.scrollContainer).scrollLeft();
						if (list.scroll.moveX > 0 && l < list.scroll.maxX || list.scroll.moveX < 0 && l > 0) {
							JQ(opts.scrollContainer).scrollLeft(l + list.scroll.moveX);
							list.draggedItem.css("left", list.draggedItem.offset().left + list.scroll.moveX + 1);
						}
					}, 10);

					list.setPos(e.pageX, e.pageY);
					JQ(document).bind("selectstart", list.stopBubble); //stop ie text selection
					JQ(document).bind("mousemove", list.swapItems);
					JQ(document).bind("mouseup", list.dropItem);
					if (opts.scrollContainer != window)
						JQ(window).bind("DOMMouseScroll mousewheel", list.wheel);
					return false; //stop moz text selection
				},

				setPos: function(x, y) {
					var top = y - this.offset.top;
					var left = x - this.offset.left;

					if (!opts.dragBetween) {
						top = Math.min(this.offsetLimit.bottom, Math.max(top, this.offsetLimit.top));
						left = Math.min(this.offsetLimit.right, Math.max(left, this.offsetLimit.left));
					}

					this.draggedItem.parents().each(function() {
						if (JQ(this).css("position") != "static" && (!JQ.browser.mozilla || JQ(this).css("display") != "table")) {
							var offset = JQ(this).offset();
							top -= offset.top;
							left -= offset.left;
							return false;
						}
					});

					if (opts.scrollContainer == window) {
						y -= JQ(window).scrollTop();
						x -= JQ(window).scrollLeft();
						y = Math.max(0, y - JQ(window).height() + 5) + Math.min(0, y - 5);
						x = Math.max(0, x - JQ(window).width() + 5) + Math.min(0, x - 5);
					} else {
						var cont = JQ(opts.scrollContainer);
						var offset = cont.offset();
						y = Math.max(0, y - cont.height() - offset.top) + Math.min(0, y - offset.top);
						x = Math.max(0, x - cont.width() - offset.left) + Math.min(0, x - offset.left);
					}
					
					list.scroll.moveX = x == 0 ? 0 : x * opts.scrollSpeed / Math.abs(x);
					list.scroll.moveY = y == 0 ? 0 : y * opts.scrollSpeed / Math.abs(y);

					this.draggedItem.css({ top: top, left: left });
				},
				
				wheel: function(e) {
					if ((JQ.browser.safari || JQ.browser.mozilla) && list && opts.scrollContainer != window) {
						var cont = JQ(opts.scrollContainer);
						var offset = cont.offset();
						if (e.pageX > offset.left && e.pageX < offset.left + cont.width() && e.pageY > offset.top && e.pageY < offset.top + cont.height()) {
							var delta = e.detail ? e.detail * 5 : e.wheelDelta / -2;
							cont.scrollTop(cont.scrollTop() + delta);
							e.preventDefault();
						}
					}
				},

				buildPositionTable: function() {
					var item = this.draggedItem == null ? null : this.draggedItem.get(0);
					var pos = [];
					JQ(this.container).children(opts.itemSelector).each(function(i, elm) {
						if (elm != item) {
							var loc = JQ(elm).offset();
							loc.right = loc.left + JQ(elm).width();
							loc.bottom = loc.top + JQ(elm).height();
							loc.elm = elm;
							pos.push(loc);
						}
					});
					this.pos = pos;
				},

				dropItem: function() {
					if (list.draggedItem == null)
						return;

					JQ(list.container).find(opts.dragSelector).css("cursor", "pointer");
					list.placeHolderItem.before(list.draggedItem);

					list.draggedItem.attr("style", list.draggedItem.attr("data-origStyle")).removeAttr("data-origStyle");
					list.placeHolderItem.remove();

					JQ("[data-dropTarget]").remove();

					window.clearInterval(list.scroll.scrollY);
					window.clearInterval(list.scroll.scrollX);

					var changed = false;
					JQ(lists).each(function() {
						JQ(this.container).children(opts.itemSelector).each(function(j) {
							if (parseInt(JQ(this).attr("data-itemIdx")) != j) {
								changed = true;
								JQ(this).attr("data-itemIdx", j);
							}
						});
					});
					if (changed)
						opts.dragEnd.apply(list.draggedItem);
					list.draggedItem = null;
					JQ(document).unbind("selectstart", list.stopBubble);
					JQ(document).unbind("mousemove", list.swapItems);
					JQ(document).unbind("mouseup", list.dropItem);
					if (opts.scrollContainer != window)
						JQ(window).unbind("DOMMouseScroll mousewheel", list.wheel);
					return false;
				},

				stopBubble: function() { return false; },

				swapItems: function(e) {
					if (list.draggedItem == null)
						return false;

					list.setPos(e.pageX, e.pageY);

					var ei = list.findPos(e.pageX, e.pageY);
					var nlist = list;
					for (var i = 0; ei == -1 && opts.dragBetween && i < lists.length; i++) {
						ei = lists[i].findPos(e.pageX, e.pageY);
						nlist = lists[i];
					}

					if (ei == -1 || JQ(nlist.pos[ei].elm).attr("data-placeHolder"))
						return false;

					if (lastPos == null || lastPos.top > list.draggedItem.offset().top || lastPos.left > list.draggedItem.offset().left)
						JQ(nlist.pos[ei].elm).before(list.placeHolderItem);
					else
						JQ(nlist.pos[ei].elm).after(list.placeHolderItem);

					JQ(lists).each(function(i, l) { l.createDropTargets(); l.buildPositionTable(); });
					lastPos = list.draggedItem.offset();
					return false;
				},

				findPos: function(x, y) {
					for (var i = 0; i < this.pos.length; i++) {
						if (this.pos[i].left < x && this.pos[i].right > x && this.pos[i].top < y && this.pos[i].bottom > y)
							return i;
					}
					return -1;
				},

				createDropTargets: function() {
					if (!opts.dragBetween)
						return;

					JQ(lists).each(function() {
						var ph = JQ(this.container).find("[data-placeHolder]");
						var dt = JQ(this.container).find("[data-dropTarget]");
						if (ph.size() > 0 && dt.size() > 0)
							dt.remove();
						else if (ph.size() == 0 && dt.size() == 0)
							JQ(this.container).append(list.placeHolderItem.clone().removeAttr("data-placeHolder").attr("data-dropTarget", true));
					});
				}
			};

			newList.init();
			lists.push(newList);
		});

		return this;
	};

	JQ.fn.dragsort.defaults = {
		itemSelector: "li",
		dragSelector: "li",
		dragSelectorExclude: "input, textarea, a[href]",
		dragEnd: function() { },
		dragBetween: false,
		placeHolderTemplate: "<li>&nbsp;</li>",
		scrollContainer: window,
		scrollSpeed: 5
	};

})(jQuery);
