import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { EnvironmentLoaderService } from '../../config/services/environment-loader.service';
import { BaseService } from '../../abstract/base.service';
import { ApplicationLoggerService } from '../../logger/services/application-logger.service';

@Injectable({
	providedIn: 'root',
})
export class InnerStorageService extends BaseService {
	private _elements: any[];
	private _environment: any;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
		this.elements = [];
		this.environment = this.applicationLogger.environment;
	}

	getClassName(): string {
		return 'InnerStorageService';
	}

	put(key: string, value: any) {
		const index = this.elements.findIndex((el) => el.key === key);
		if (index !== -1) {
			this.elements[index].value = value;
		} else {
			this.elements.push({ key: key, value: value });
		}
		this.updateStorageLog();
		this.applicationLogger.logStorageAdd(this.log, key);
	}
	get(key: string): any {
		const element: any = this.elements.find((el) => el.key === key);
		if (element) {
			return element.value;
		}
		return undefined;
	}
	remove(key: string) {
		const index = this.elements.findIndex((el) => el.key === key);
		if (index !== -1) {
			this.elements.splice(index, 1);
			this.updateStorageLog();
			this.applicationLogger.logStorageRemove(this.log, key);
		}
	}
	evaluatePut(key: string, value: any) {
		if (this.environment.enable.innerStorage) {
			this.put(key, value);
		}
	}
	evaluateGet(key: string): any {
		if (this.environment.enable.innerStorage) {
			const ELEMENT_STORE = this.get(key);
			if (ELEMENT_STORE) {
				return ELEMENT_STORE;
			}
		}
		return undefined;
	}
	evaluateGetObserver(key: string): Observable<any> {
		if (this.environment.enable.innerStorage) {
			const element = this.evaluateGet(key);
			if (element) {
				return of(element);
			}
			return of(undefined);
		}
		return of(undefined);
	}

	private updateStorageLog() {
		window['storage'] = { elements: this.elements.length };
		window['storageDetails'] = { elements: this.elements };
	}

	/**
	 * Getter elements
	 * @return any[]
	 */
	public get elements(): any[] {
		return this._elements;
	}

	/**
	 * Setter elements
	 * @param any[] value
	 */
	public set elements(value: any[]) {
		this._elements = value;
	}

	/**
	 * Getter environment
	 * @return any
	 */
	public get environment(): any {
		return this._environment;
	}

	/**
	 * Setter environment
	 * @param any value
	 */
	public set environment(value: any) {
		this._environment = value;
	}
}
/**
 * HOW TO USE ON OBSERVABLES
 *
 	const NAME_STORE = 'functionService';
	const RESULT_STORE: Observable<any> = this.innerStorage.evaluateGetObserver(NAME_STORE);
	if (RESULT_STORE) {
		return RESULT_STORE;
	}
	return this.httpClient.get(url).pipe(
      map((response: any) => {
	  		this.innerStorage.evaluatePut(NAME_STORE, response);
        return response;
      }),
    );
 */
