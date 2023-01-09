import { ApiModel } from '../../api/cakeutils/base/api.model';
import { CurrencyModel } from '../../util-currency/models/currency.model';

export class PriceModel extends ApiModel {
	private _cod: string;
	private _price: number;
	private _total: number;
	private _iva: number;
	private _iva_percent: number;
	private _discount: number;
	private _discount_percent: number;
	private _tax: number;
	private _currency: CurrencyModel;
	private _totalsum: number;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter price
	 * @return {number}
	 */
	public get price(): number {
		return this._price;
	}

	/**
	 * Getter total
	 * @return {number}
	 */
	public get total(): number {
		return this._total;
	}

	/**
	 * Getter iva
	 * @return {number}
	 */
	public get iva(): number {
		return this._iva;
	}

	/**
	 * Getter iva_percent
	 * @return {number}
	 */
	public get iva_percent(): number {
		return this._iva_percent;
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
	 * Getter tax
	 * @return {number}
	 */
	public get tax(): number {
		return this._tax;
	}

	/**
	 * Getter currency
	 * @return {CurrencyModel}
	 */
	public get currency(): CurrencyModel {
		return this._currency;
	}

	/**
	 * Getter totalsum
	 * @return {number}
	 */
	public get totalsum(): number {
		return this._totalsum;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter price
	 * @param {number} value
	 */
	public set price(value: number) {
		this._price = value;
	}

	/**
	 * Setter total
	 * @param {number} value
	 */
	public set total(value: number) {
		this._total = value;
	}

	/**
	 * Setter iva
	 * @param {number} value
	 */
	public set iva(value: number) {
		this._iva = value;
	}

	/**
	 * Setter iva_percent
	 * @param {number} value
	 */
	public set iva_percent(value: number) {
		this._iva_percent = value;
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
	 * Setter tax
	 * @param {number} value
	 */
	public set tax(value: number) {
		this._tax = value;
	}

	/**
	 * Setter currency
	 * @param {CurrencyModel} value
	 */
	public set currency(value: CurrencyModel) {
		this._currency = value;
	}

	/**
	 * Setter totalsum
	 * @param {number} value
	 */
	public set totalsum(value: number) {
		this._totalsum = value;
	}
}
