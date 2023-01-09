export function formatLabelChart(label: any, isCurrency?: boolean): string {
	if (label instanceof Date) {
		label = label.toLocaleDateString();
	} else if (isCurrency) {
		label = label.toLocaleString();
	}

	return label;
}
