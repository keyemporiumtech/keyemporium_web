export class RouteUrlModel {
	url: string | string[];
	params?: string;

	get urlNavigate(): string {
		if (this.url && this.url instanceof Array) {
			return this.url.join('/') + (this.params ? this.params : '');
		} else if (this.url) {
			return this.url + (this.params ? this.params : '');
		}
		return '';
	}

	constructor(url: string | string[], params?: string) {
		this.url = url;
		this.params = params;
	}
}
