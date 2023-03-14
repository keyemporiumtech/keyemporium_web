import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

export function translateLoader(http: HttpClient) {
	return new MultiTranslateHttpLoader(http, [], '.json');
}

export class MultiTranslateHttpLoader implements TranslateLoader {
	constructor(private http: HttpClient, public resources: any[] = [], public suffix: string) {}

	/**
	 * Gets the translations from the server
	 * @param lang
	 * @returns any
	 */
	public getTranslation(lang: string): any {
		return combineLatest(
			this.resources.map((resource) => {
				return this.http.get(resource + lang + this.suffix);
			}),
		).pipe(
			map((response: any) => {
				return response.reduce((a, b) => {
					const obj: any = Object.assign(a, b);
					return obj;
				});
			}),
		);
	}
}
