export class MathUtility {
	static percent(partial: number, max: number): number {
		return +((100 * partial) / max).toFixed(2);
	}

	static pages(total: number, rowsForPage: number): number {
		const division = Math.floor(total / rowsForPage);
		const remaining = total % rowsForPage;
		return remaining > 0 ? division + 1 : division;
	}
}
