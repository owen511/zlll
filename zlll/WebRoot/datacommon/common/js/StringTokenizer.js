function StringTokenizer(str, delim, returnDelims){
	this.currentPosition = 0;
	this.newPosition = -1;
	this.maxPosition = str.length;
	this.str = str;
	this.delimiters = delim;
	this.retDelims = returnDelims;
	this.delimsChanged = false;
	this.maxDelimChar;
	this.setMaxDelimChar();
};

StringTokenizer.prototype.setMaxDelimChar = function() {
	if (this.delimiters == null) {
		this.maxDelimChar = 0;
		return;
	}
	var m = 0;
	for (var i = 0; i < this.delimiters.length; i++) {
		var c = this.delimiters.charCodeAt(i);
		if (m < c)
			m = c;
	}
	this.maxDelimChar = m;
};

StringTokenizer.prototype.setMaxDelimChar = function(){
	if (this.delimiters == null) {
			this.maxDelimChar = 0;
			return;
	}

	var m = 0;
	for (var i = 0; i < this.delimiters.length; i++) {
		var c = this.delimiters.charCodeAt(i);
		if (m < c)
			m = c;
	}
	this.maxDelimChar = m;
};

StringTokenizer.prototype.skipDelimiters = function(startPos) {
	if (this.delimiters == null)
			return -1;

	var position = startPos;
	while (!this.retDelims && position < this.maxPosition) {
		var c = this.str.charCodeAt(position);
		var c1 = this.str.charAt(position);
		if ((c > this.maxDelimChar) || (this.delimiters.indexOf(c1) < 0))
			break;
			position++;
	}
	return position;
};

StringTokenizer.prototype.scanToken = function(startPos) {
	var position = startPos;
	while (position < this.maxPosition) {
		var c = this.str.charCodeAt(position);
		var c1 = this.str.charAt(position);
		if ((c <= this.maxDelimChar) && (this.delimiters.indexOf(c1) >= 0))
			break;
			position++;
	}
	if (this.retDelims && (startPos == position)) {
		var c = this.str.charCodeAt(position);
		var c1 = this.str.charAt(position);
		if ((c <= this.maxDelimChar) && (this.delimiters.indexOf(c1) >= 0))
			position++;
	}
	return position;
};

StringTokenizer.prototype.hasMoreTokens = function(){
	this.newPosition = this.skipDelimiters(this.currentPosition);
	return (this.newPosition < this.maxPosition);
};

StringTokenizer.prototype.nextToken = function(delim) {
	
	if(delim){
		this.delimiters = delim;
		this.delimsChanged = true;
		this.setMaxDelimChar();
		return this.nextToken();
	}
	this.currentPosition = (this.newPosition >= 0 && !this.delimsChanged) ? this.newPosition
				: this.skipDelimiters(this.currentPosition);
	this.delimsChanged = false;
	this.newPosition = -1;
	if (this.currentPosition >= this.maxPosition)
			return;
	var start = this.currentPosition;
	this.currentPosition = this.scanToken(this.currentPosition);
	return this.str.substring(start, this.currentPosition);
};

StringTokenizer.prototype.hasMoreElements = function() {
		return this.hasMoreTokens();
};
StringTokenizer.prototype.nextElement = function() {
	return this.nextToken();
};

StringTokenizer.prototype.countTokens = function() {
	var count = 0;
	var currpos = this.currentPosition;
	while (currpos < this.maxPosition) {
		currpos = this.skipDelimiters(currpos);
		if (currpos >= this.maxPosition)
			break;
			currpos = this.scanToken(currpos);
			count++;
	}
	return count;
};