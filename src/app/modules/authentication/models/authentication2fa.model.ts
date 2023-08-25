import { DateModel } from '@ddc/kit';
import { ApiModel } from '../../api/cakeutils/base/api.model';

export class Authentication2faModel extends ApiModel {
	private _lastCod: string;
	private _lastTime: string; // date
	private _key: string;
	private _timeWait: number;

	public get lastTimeModel(): DateModel {
		return new DateModel(this.lastTime);
	}
	public get lastTimeFormat(): string {
		const dateModel = new DateModel(this.lastTime);
		return dateModel.toString();
	}

	/**
	 * Getter lastCod
	 * @return {string}
	 */
	public get lastCod(): string {
		return this._lastCod;
	}

	/**
	 * Getter lastTime
	 * @return {string}
	 */
	public get lastTime(): string {
		return this._lastTime;
	}

	/**
	 * Setter lastCod
	 * @param {string} value
	 */
	public set lastCod(value: string) {
		this._lastCod = value;
	}

	/**
	 * Setter lastTime
	 * @param {string} value
	 */
	public set lastTime(value: string) {
		this._lastTime = value;
	}

	/**
	 * Getter key
	 * @return {string}
	 */
	public get key(): string {
		return this._key;
	}

	/**
	 * Getter timeWait
	 * @return {number}
	 */
	public get timeWait(): number {
		return this._timeWait;
	}

	/**
	 * Setter key
	 * @param {string} value
	 */
	public set key(value: string) {
		this._key = value;
	}

	/**
	 * Setter timeWait
	 * @param {number} value
	 */
	public set timeWait(value: number) {
		this._timeWait = value;
	}
}
