export class PageUtility {
	static goToUrlTargetBlank(url: string) {
		window.open(url, '_blank');
	}

	static encodeParam(val: string): string {
		return val ? encodeURIComponent(btoa(val)) : '';
	}

	static decodeParam(val: string): string {
		return val ? atob(decodeURIComponent(val)) : undefined;
	}

	static encodeUrl(url: string | string[], params: string[]): string[] {
		if (url && url instanceof Array) {
			return this.getEncodeArrayUrl(url, params);
		} else if (url && typeof url === 'string') {
			return this.getEncodeArrayUrl(url.split('/'), params);
		}
		return undefined;
	}

	private static getEncodeArrayUrl(url: string[], params: string[]): string[] {
		let indexParams: number = 0;
		const result: string[] = [];
		for (const el of url) {
			if (el.indexOf(':') > -1) {
				result.push(this.encodeParam(params[indexParams]));
				indexParams++;
			} else {
				result.push(el);
			}
		}
		return result;
	}
}
