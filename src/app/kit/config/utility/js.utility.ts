export class JsUtility {
	static moveCursor(element: any, position: number) {
		if (element.createTextRange) {
			//IE
			var range = element.createTextRange();
			range.move('character', position);
			range.select();
		} else if (typeof element.selectionStart === 'number') {
			//Tutti gli altri browser
			element.focus();
			element.setSelectionRange(position, position);
		}
	}
}
