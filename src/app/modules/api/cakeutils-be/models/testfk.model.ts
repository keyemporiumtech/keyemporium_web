import { ApiModel } from '../../cakeutils/base/api.model';
import { TestModel } from './test.model';

export class TestfkModel extends ApiModel {
	private _cod: string;
	private _title: string;
	private _description: string;
	private _result: boolean;
	private _test: TestModel;
	// relation values
	private _test_title: string;

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

	/**
	 * Getter test
	 * @return {TestModel}
	 */
	public get test(): TestModel {
		return this._test;
	}

	/**
	 * Setter test
	 * @param {TestModel} value
	 */
	public set test(value: TestModel) {
		this._test = value;
	}

	/**
	 * Getter test_title
	 * @return {string}
	 */
	public get test_title(): string {
		return this._test_title;
	}

	/**
	 * Setter test_title
	 * @param {string} value
	 */
	public set test_title(value: string) {
		this._test_title = value;
	}
}
