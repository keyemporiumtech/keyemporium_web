export function formatLabelChart(label: any, isCurrency?: boolean): string {
	if (label instanceof Date) {
		label = label.toLocaleDateString();
	} else if (isCurrency) {
		label = label.toLocaleString();
	} else {
		label = label;
	}

	return label;
}
