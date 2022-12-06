import { NavigationExtras } from '@angular/router';

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

	static cleanUrl(url: string): string {
		let baseUrl: string = url;
		let paramsUrl: string = '';
		if (url.indexOf('?')) {
			const arrUrl = url.split('?');
			if (arrUrl && arrUrl.length === 2) {
				baseUrl = arrUrl[0];
				paramsUrl = arrUrl[1];
			}
		}
		let arrBaseUrl: string[] = [];
		if (baseUrl.indexOf('/')) {
			arrBaseUrl = baseUrl.split('/');
		} else if (baseUrl.indexOf('\\')) {
			arrBaseUrl = baseUrl.split('\\');
		} else {
			arrBaseUrl = [baseUrl];
		}
		return (
			arrBaseUrl
				.filter(function (value, index, arr) {
					return (
						value &&
						value.indexOf('http') === -1 &&
						value !== '#' &&
						value.indexOf(document.location.hostname) === -1
					);
				})
				.join('/') + (paramsUrl ? '?' + paramsUrl : '')
		);
	}

	static splitUrl(url: string): { url: string[]; params: string[] } {
		url = this.cleanUrl(url);
		let baseUrl: string = url;
		let paramsUrl: string = '';
		if (url.indexOf('?') !== -1) {
			const arrUrl = url.split('?');
			if (arrUrl && arrUrl.length === 2) {
				baseUrl = arrUrl[0];
				paramsUrl = arrUrl[1];
			}
		}
		let arrBaseUrl: string[] = [];
		if (baseUrl.indexOf('/') !== -1) {
			arrBaseUrl = baseUrl.split('/');
		} else if (baseUrl.indexOf('\\') !== -1) {
			arrBaseUrl = baseUrl.split('\\');
		} else {
			arrBaseUrl = [baseUrl];
		}

		let arrParamsUrl: string[] = [];
		if (paramsUrl && paramsUrl.indexOf('&')) {
			arrParamsUrl = paramsUrl.split('&');
		} else if (paramsUrl) {
			arrParamsUrl = [paramsUrl];
		}

		return { url: arrBaseUrl.filter((el) => el !== ''), params: arrParamsUrl };
	}

	static splitUrlNavigationExtrasQueryParameters(
		url: string,
		extras?: NavigationExtras,
	): { url: string[]; extras: NavigationExtras } {
		const starter = this.splitUrl(url);
		const extrasTmp: NavigationExtras = extras ? extras : {};
		if (starter.params && starter.params.length) {
			let arrParamKV: string[];
			for (const param of starter.params) {
				arrParamKV = [];
				if (param.indexOf('=')) {
					arrParamKV = param.split('=');
				}
				if (arrParamKV && arrParamKV.length && arrParamKV.length === 2) {
					if (!Object.prototype.hasOwnProperty.call(extrasTmp, 'queryParams')) {
						extrasTmp.queryParams = {};
					}
					if (!Object.prototype.hasOwnProperty.call(extrasTmp, arrParamKV[0])) {
						extrasTmp.queryParams[arrParamKV[0]] = arrParamKV[1];
					}
				}
			}
		}

		return { url: starter.url, extras: extrasTmp };
	}
}
