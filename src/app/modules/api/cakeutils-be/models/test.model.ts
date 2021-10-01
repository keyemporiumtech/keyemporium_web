import { ApiModel } from '../../cakeutils/base/api.model';

export class TestModel extends ApiModel {
	private _cod: string;
	private _title: string;
	private _description: string;
	private _result: boolean;

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
	 * Getter result
	 * @return {boolean}
	 */
	public get result(): boolean {
		return this._result;
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
	 * Setter result
	 * @param {boolean} value
	 */
	public set result(value: boolean) {
		this._result = value;
	}
}
