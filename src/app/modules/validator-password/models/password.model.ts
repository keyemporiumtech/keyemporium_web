import { ApiModel } from '../../api/cakeutils/base/api.model';

export class PasswordModel extends ApiModel {
	private _input: string;
	private _level: number;

	/**
	 * Getter input
	 * @return {string}
	 */
	public get input(): string {
		return this._input;
	}

	/**
	 * Getter level
	 * @return {number}
	 */
	public get level(): number {
		return this._level;
	}

	/**
	 * Setter input
	 * @param {string} value
	 */
	public set input(value: string) {
		this._input = value;
	}

	/**
	 * Setter level
	 * @param {number} value
	 */
	public set level(value: number) {
		this._level = value;
	}
}
