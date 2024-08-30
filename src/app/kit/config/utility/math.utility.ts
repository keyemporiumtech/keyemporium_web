export class MathUtility {
	static percent(partial: number, max: number): number {
		return +((100 * partial) / max).toFixed(2);
	}
	static percentInverse(percent: number, max: number): number {
		return +((max * percent) / 100).toFixed(2);
	}

	static pages(total: number, rowsForPage: number): number {
		const division = Math.floor(total / rowsForPage);
		const remaining = total % rowsForPage;
		return remaining > 0 ? division + 1 : division;
	}

	// ------ statistic
	static median(list: number[]): number | undefined {
		if (!list.length) return undefined;
		const s = [...list].sort((a, b) => a - b);
		const mid = Math.floor(s.length / 2);
		return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
	}
}
