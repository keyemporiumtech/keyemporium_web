import { StringTranslate } from '../../translation/models/string-translate.model';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { InnerStorageService } from '../services/inner-storage.service';
import { ObjectUtility } from '../../config/utility/object.utility';

export class ApplicationStorageModel {
	private _key: string;
	// sub
	subTranslate1: Subscription;
	subTranslate2: Subscription;

	constructor(key: string) {
		this.key = key;
	}

	set(value: string) {
		localStorage.setItem(this.key, value ? value : '');
	}
	get(): string {
		return localStorage.getItem(this.key);
	}
	del() {
		localStorage.removeItem(this.key);
	}
	setTranslate(value: string | StringTranslate, translateService: TranslateService) {
		if (value instanceof StringTranslate) {
			this.subTranslate1 = translateService
				.get(value.key, value.params)
				.subscribe((res: string) => {
					localStorage.setItem(this.key, res);
				});
		} else if (value) {
			this.subTranslate2 = translateService.get(value).subscribe((res: string) => {
				localStorage.setItem(this.key, res);
			});
		} else {
			localStorage.setItem(this.key, '');
		}
	}
	setObj(value: any) {
		localStorage.setItem(this.key, value ? ObjectUtility.toJsonString(value) : '');
	}
	getObj(): any {
		return JSON.parse(localStorage.getItem(this.key));
	}

	setInnerObj(innerStorage: InnerStorageService, value: any) {
		innerStorage.put(this.key, value);
	}
	getInnerObj(innerStorage: InnerStorageService): any {
		return innerStorage.get(this.key);
	}

	setDestroy() {
		if (this.subTranslate1) {
			this.subTranslate1.unsubscribe();
		}
		if (this.subTranslate2) {
			this.subTranslate2.unsubscribe();
		}
	}
	/**
	 * Getter key
	 * @return string
	 */
	public get key(): string {
		return this._key;
	}

	/**
	 * Setter key
	 * @param string value
	 */
	public set key(value: string) {
		this._key = value;
	}
}
