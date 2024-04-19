import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { ApiModel } from '../../api/cakeutils/base/api.model';
import { BalanceModel } from '../../shop-payment/models/balance.model';

export class BalanceindexModel extends ApiModel {
	private _cod: string;
	private _tpbalancedoc: TypologicalModel;
	private _val: string;
	private _balance: BalanceModel;
	private _year: number;
	private _format: string;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter tpbalancedoc
	 * @return {TypologicalModel}
	 */
	public get tpbalancedoc(): TypologicalModel {
		return this._tpbalancedoc;
	}

	/**
	 * Getter val
	 * @return {string}
	 */
	public get val(): string {
		return this._val;
	}

	/**
	 * Getter balance
	 * @return {BalanceModel}
	 */
	public get balance(): BalanceModel {
		return this._balance;
	}

	/**
	 * Getter year
	 * @return {number}
	 */
	public get year(): number {
		return this._year;
	}

	/**
	 * Getter format
	 * @return {string}
	 */
	public get format(): string {
		return this._format;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter tpbalancedoc
	 * @param {TypologicalModel} value
	 */
	public set tpbalancedoc(value: TypologicalModel) {
		this._tpbalancedoc = value;
	}

	/**
	 * Setter val
	 * @param {string} value
	 */
	public set val(value: string) {
		this._val = value;
	}

	/**
	 * Setter balance
	 * @param {BalanceModel} value
	 */
	public set balance(value: BalanceModel) {
		this._balance = value;
	}

	/**
	 * Setter year
	 * @param {number} value
	 */
	public set year(value: number) {
		this._year = value;
	}

	/**
	 * Setter format
	 * @param {string} value
	 */
	public set format(value: string) {
		this._format = value;
	}
}
