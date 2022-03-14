import { ApiModel } from '../../api/cakeutils/base/api.model';

export class ReservationsettingModel extends ApiModel {
	private _cod: string;
	private _dailyweeks: string;
	private _dailymonths: string;
	private _hhreservefrom: string;
	private _hhreserveto: string;
	private _dtafrom: string;
	private _dtato: string;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter dailyweeks
	 * @return {string}
	 */
	public get dailyweeks(): string {
		return this._dailyweeks;
	}

	/**
	 * Getter dailymonths
	 * @return {string}
	 */
	public get dailymonths(): string {
		return this._dailymonths;
	}

	/**
	 * Getter hhreservefrom
	 * @return {string}
	 */
	public get hhreservefrom(): string {
		return this._hhreservefrom;
	}

	/**
	 * Getter hhreserveto
	 * @return {string}
	 */
	public get hhreserveto(): string {
		return this._hhreserveto;
	}

	/**
	 * Getter dtafrom
	 * @return {string}
	 */
	public get dtafrom(): string {
		return this._dtafrom;
	}

	/**
	 * Getter dtato
	 * @return {string}
	 */
	public get dtato(): string {
		return this._dtato;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter dailyweeks
	 * @param {string} value
	 */
	public set dailyweeks(value: string) {
		this._dailyweeks = value;
	}

	/**
	 * Setter dailymonths
	 * @param {string} value
	 */
	public set dailymonths(value: string) {
		this._dailymonths = value;
	}

	/**
	 * Setter hhreservefrom
	 * @param {string} value
	 */
	public set hhreservefrom(value: string) {
		this._hhreservefrom = value;
	}

	/**
	 * Setter hhreserveto
	 * @param {string} value
	 */
	public set hhreserveto(value: string) {
		this._hhreserveto = value;
	}

	/**
	 * Setter dtafrom
	 * @param {string} value
	 */
	public set dtafrom(value: string) {
		this._dtafrom = value;
	}

	/**
	 * Setter dtato
	 * @param {string} value
	 */
	public set dtato(value: string) {
		this._dtato = value;
	}
}
