//������ʱ�رոÿؼ� ie6�����������������л����㴦�����
function onclick() {
	with (window.event) {
		if (srcElement.getAttribute("Author") == null
				&& srcElement != outObject && srcElement != outButton)
			closeLayer();
	}
}

function onkeyup() {
	if (window.event.keyCode == 27) {
		if (outObject)
			outObject.blur();
		closeLayer();
	} else if (document.activeElement)
		if (document.activeElement.getAttribute("Author") == null
				&& document.activeElement != outObject
				&& document.activeElement != outButton) {
			closeLayer();
		}
}