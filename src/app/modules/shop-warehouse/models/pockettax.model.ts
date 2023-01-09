import { ApiModel } from '../../api/cakeutils/base/api.model';
import { PocketModel } from './pocket.model';
import { CurrencyModel } from '../../util-currency/models/currency.model';

export class PockettaxModel extends ApiModel {
	private _cod: string;
	private _pocket: PocketModel;
	private _tax: number;
	private _tax_percent: number;
	private _taxdescription: string;
	private _currency: CurrencyModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter pocket
	 * @return {PocketModel}
	 */
	public get pocket(): PocketModel {
		return this._pocket;
	}

	/**
	 * Getter tax
	 * @return {number}
	 */
	public get tax(): number {
		return this._tax;
	}

	/**
	 * Getter tax_percent
	 * @return {number}
	 */
	public get tax_percent(): number {
		return this._tax_percent;
	}

	/**
	 * Getter taxdescription
	 * @return {string}
	 */
	public get taxdescription(): string {
		return this._taxdescription;
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
	 * Setter pocket
	 * @param {PocketModel} value
	 */
	public set pocket(value: PocketModel) {
		this._pocket = value;
	}

	/**
	 * Setter tax
	 * @param {number} value
	 */
	public set tax(value: number) {
		this._tax = value;
	}

	/**
	 * Setter tax_percent
	 * @param {number} value
	 */
	public set tax_percent(value: number) {
		this._tax_percent = value;
	}

	/**
	 * Setter taxdescription
	 * @param {string} value
	 */
	public set taxdescription(value: string) {
		this._taxdescription = value;
	}

	/**
	 * Setter currency
	 * @param {CurrencyModel} value
	 */
	public set currency(value: CurrencyModel) {
		this._currency = value;
	}
}
