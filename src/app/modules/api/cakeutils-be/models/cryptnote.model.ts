import { ApiModel } from '../../cakeutils/base/api.model';

export class CryptnoteModel extends ApiModel {
	private _cod: string;
	private _title: string;
	private _description: string;
	private _crypt: string;
	private _symbol: string;
	private _flgused: boolean;

	// utils
	showVal?: boolean;
	showUser?: boolean;

	get cryptVal(): string {
		if (this.showVal) {
			return this.crypt;
		}
		return '********************';
	}
	get cryptUser(): string {
		if (this.showUser) {
			return this.title;
		}
		return '********************';
	}

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter title
	 * @return {string}
	 */
	public get title(): string {
		return this._title;
	}

	/**
	 * Getter description
	 * @return {string}
	 */
	public get description(): string {
		return this._description;
	}

	/**
	 * Getter crypt
	 * @return {string}
	 */
	public get crypt(): string {
		return this._crypt;
	}

	/**
	 * Getter symbol
	 * @return {string}
	 */
	public get symbol(): string {
		return this._symbol;
	}

	/**
	 * Getter flgused
	 * @return {boolean}
	 */
	public get flgused(): boolean {
		return this._flgused;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter title
	 * @param {string} value
	 */
	public set title(value: string) {
		this._title = value;
	}

	/**
	 * Setter description
	 * @param {string} value
	 */
	public set description(value: string) {
		this._description = value;
	}

	/**
	 * Setter crypt
	 * @param {string} value
	 */
	public set crypt(value: string) {
		this._crypt = value;
	}

	/**
	 * Setter symbol
	 * @param {string} value
	 */
	public set symbol(value: string) {
		this._symbol = value;
	}

	/**
	 * Setter flgused
	 * @param {boolean} value
	 */
	public set flgused(value: boolean) {
		this._flgused = value;
	}
}
