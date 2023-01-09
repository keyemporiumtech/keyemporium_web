import { ApiModel } from '../../api/cakeutils/base/api.model';
import { CurrencyModel } from '../../util-currency/models/currency.model';

export class DiscountModel extends ApiModel {
	private _cod: string;
	private _discount: number;
	private _discount_percent: number;
	private _description: string;
	private _levelquantity: number;
	private _levelprice: number;
	private _dtainit: string;
	private _dtaend: string;
	private _flgsystem: boolean;
	private _flglevelbasket: boolean;
	private _currency: CurrencyModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter discount
	 * @return {number}
	 */
	public get discount(): number {
		return this._discount;
	}

	/**
	 * Getter discount_percent
	 * @return {number}
	 */
	public get discount_percent(): number {
		return this._discount_percent;
	}

	/**
	 * Getter description
	 * @return {string}
	 */
	public get description(): string {
		return this._description;
	}

	/**
	 * Getter levelquantity
	 * @return {number}
	 */
	public get levelquantity(): number {
		return this._levelquantity;
	}

	/**
	 * Getter levelprice
	 * @return {number}
	 */
	public get levelprice(): number {
		return this._levelprice;
	}

	/**
	 * Getter dtainit
	 * @return {string}
	 */
	public get dtainit(): string {
		return this._dtainit;
	}

	/**
	 * Getter dtaend
	 * @return {string}
	 */
	public get dtaend(): string {
		return this._dtaend;
	}

	/**
	 * Getter flgsystem
	 * @return {boolean}
	 */
	public get flgsystem(): boolean {
		return this._flgsystem;
	}

	/**
	 * Getter flglevelbasket
	 * @return {boolean}
	 */
	public get flglevelbasket(): boolean {
		return this._flglevelbasket;
	}

	/**
	 * Getter currency
	 * @return {CurrencyModel}
	 */
	public get currency(): CurrencyModel {
		return this._currency;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter discount
	 * @param {number} value
	 */
	public set discount(value: number) {
		this._discount = value;
	}

	/**
	 * Setter discount_percent
	 * @param {number} value
	 */
	public set discount_percent(value: number) {
		this._discount_percent = value;
	}

	/**
	 * Setter description
	 * @param {string} value
	 */
	public set description(value: string) {
		this._description = value;
	}

	/**
	 * Setter levelquantity
	 * @param {number} value
	 */
	public set levelquantity(value: number) {
		this._levelquantity = value;
	}

	/**
	 * Setter levelprice
	 * @param {number} value
	 */
	public set levelprice(value: number) {
		this._levelprice = value;
	}

	/**
	 * Setter dtainit
	 * @param {string} value
	 */
	public set dtainit(value: string) {
		this._dtainit = value;
	}

	/**
	 * Setter dtaend
	 * @param {string} value
	 */
	public set dtaend(value: string) {
		this._dtaend = value;
	}

	/**
	 * Setter flgsystem
	 * @param {boolean} value
	 */
	public set flgsystem(value: boolean) {
		this._flgsystem = value;
	}

	/**
	 * Setter flglevelbasket
	 * @param {boolean} value
	 */
	public set flglevelbasket(value: boolean) {
		this._flglevelbasket = value;
	}

	/**
	 * Setter currency
	 * @param {CurrencyModel} value
	 */
	public set currency(value: CurrencyModel) {
		this._currency = value;
	}
}
