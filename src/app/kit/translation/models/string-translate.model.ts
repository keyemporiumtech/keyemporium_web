export class StringTranslate {
	private _key: string;
	private _params: any;

	constructor(key: string, params?: any) {
		this.key = key;
		this.params = params;
	}
	/**
	 * Getter key
	 * @return string
	 */
	public get key(): string {
		return this._key;
	}

	/**
	 * Getter params
	 * @return any
	 */
	public get params(): any {
		return this._params;
	}

	/**
	 * Setter key
	 * @param string value
	 */
	public set key(value: string) {
		this._key = value;
	}

	/**
	 * Setter params
	 * @param any value
	 */
	public set params(value: any) {
		this._params = value;
	}
}
