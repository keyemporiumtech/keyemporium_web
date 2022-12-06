/**
 * Formats a label given a date, number or string.
 *
 * @export
 */
export function formatLabel(label: any): string {
	if (label instanceof Date) {
		label = label.toLocaleDateString();
	} else {
		label = label.toLocaleString();
	}

	return label;
}

/**
 * Escapes a label.
 *
 * @export
 */
export function escapeLabel(label: any): string {
	return label.toLocaleString().replace(/[&'`"<>]/g, (match) => {
		return {
			'&': '&amp;',
			// eslint-disable-next-line @typescript-eslint/quotes
			"'": '&#x27;',
			'`': '&#x60;',
			'"': '&quot;',
			'<': '&lt;',
			'>': '&gt;',
		}[match];
	});
}
