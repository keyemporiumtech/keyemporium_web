export class ObjectUtility {
	static isEmptyObject(obj) {
		for (const prop in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, prop)) {
				return false;
			}
		}
		return true;
	}
	/**
	 * Controlla se un modello ha campi vuoti eccetto alcuni
	 * @param model oggetto da controllare se è vuoto
	 * @param except array di campi da escludere per il controllo (un esempio di traduzione {id: 1, val: { id: 2}} -> ['id', 'val.id'])
	 * @param prefix prefisso da anteporre ad una chiave prima di valutarne l'esclusione
	 */
	static isEmptyModel(model: any, except?: string[], prefix?: string): boolean {
		for (const key in model) {
			if (typeof model[key] === 'function') {
				continue;
			}
			if (except && except.length && except.indexOf(prefix ? prefix + '.' + key : key) > -1) {
				continue;
			}
			const prefixChild = except && except.length ? (prefix ? prefix + '.' + key : key) : undefined;
			if (typeof model[key] === 'object' && !this.isEmptyModel(model[key], except, prefixChild)) {
				return false;
			} else if (typeof model[key] !== 'object' && model[key]) {
				return false;
			}
		}
		return true;
	}

	static isEmptyIdModel(
		model: any,
		fieldForId?: string,
		except?: string[],
		name?: string,
	): boolean {
		if (
			Object.prototype.hasOwnProperty.call(model, fieldForId ? fieldForId : 'id') &&
			!model[fieldForId ? fieldForId : 'id']
		) {
			return true;
		}
		return this.isEmptyModel(model, except, name);
	}

	static isEmptyWithoutIdModel(
		model: any,
		fieldForId?: string,
		except?: string[],
		name?: string,
	): boolean {
		if (!Object.prototype.hasOwnProperty.call(model, fieldForId ? fieldForId : 'id')) {
			return true;
		}
		return this.isEmptyIdModel(model, fieldForId, except, name);
	}

	/**
	 * Risolve il valore di qualsiasi campo di un oggetto.
	 * Controlla se il campo contiene . (carattere punto) e scorre le proprietà del modello per individuare il valore di ritorno.
	 * @param field nome del campo del modello (può contenere il punto)
	 * @param modelBind oggetto che contiene il campo
	 */
	static resolvePropertyModel(field: any, modelBind: any): any {
		const fieldName: string = field;
		let retVal: string = '';
		if (fieldName.indexOf('.') !== -1) {
			const arr: string[] = fieldName.split('.');
			for (let i = 0; i < arr.length; i++) {
				if (i === 0) {
					retVal = modelBind[arr[i]] ? modelBind[arr[i]] : undefined;
				} else {
					retVal = retVal && retVal[arr[i]] ? retVal[arr[i]] : undefined;
				}
			}
		} else {
			retVal = modelBind[fieldName] ? modelBind[fieldName] : undefined;
		}
		return retVal;
	}

	static unionObjects(obj1: any, obj2: any): any {
		const result = obj1 ? obj1 : {};
		for (const key of Object.keys(result)) {
			result[key] = result[key] ? result[key] : '';
		}
		const obj = obj2 ? obj2 : {};
		for (const key of Object.keys(obj)) {
			result[key] = obj[key] ? obj[key] : '';
		}
		return result;
	}

	/**
	 * Trasforma un oggetto con proprietà private risolte in getter e setter (che iniziano con _ underscore)
	 * in una stringa con stringfy
	 *
	 * @example {_id: 1} => {id: 1, _id:1}
	 * @param obj oggetto da convertire
	 */
	static toJsonString(obj: any, jsonIn?: string): string {
		let json = jsonIn ? jsonIn : JSON.stringify(obj);
		Object.keys(obj)
			.filter((key) => key[0] === '_')
			.forEach((key) => {
				json = json.replace(key, key.substring(1));
				if (obj[key] instanceof Object) {
					json = this.toJsonString(obj[key], json);
				}
			});

		return json;
	}

	/**
	 * Converte una url di query parameters in un oggetto chiave->valore
	 */
	static urlParamsToObject(url: string): any {
		const obj = {};
		if (url) {
			const clean: string = url.replace('?', '');
			const split1: string[] = clean.split('&');
			let split2: string[];
			if (split1 && split1.length) {
				for (const el1 of split1) {
					split2 = el1.split('=');
					if (split2 && split2.length && split2.length === 2) {
						obj[split2[0]] = split2[1];
					}
				}
			}
		}
		return obj;
	}

	/**
	 * Determina se un item è di tipo object
	 * @param item item da controllare
	 */
	static isObject(item: any): boolean {
		return item && typeof item === 'object' && !Array.isArray(item);
	}
	/**
	 * Effettua il merge di un oggetto con altri oggetti
	 * @param target oggetto target
	 * @param sources lista di altri oggetti da mergiare
	 */
	static mergeDeep(target: any, ...sources: any): any {
		if (!sources.length) {
			return target;
		}
		const source = sources.shift();

		if (this.isObject(target) && this.isObject(source)) {
			for (const key in source) {
				if (this.isObject(source[key])) {
					if (!target[key]) {
						Object.assign(target, { [key]: {} });
					}
					this.mergeDeep(target[key], source[key]);
				} else {
					Object.assign(target, { [key]: source[key] });
				}
			}
		}

		return this.mergeDeep(target, ...sources);
	}
}
