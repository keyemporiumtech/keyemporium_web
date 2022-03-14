import { PaymentModel } from './payment.model';
import { ApiModel } from '../../api/cakeutils/base/api.model';

export class BalanceFlowModel extends ApiModel {
	private _priceIn: number;
	private _priceOut: number;
	private _ivaIn: number;
	private _ivaOut: number;
	private _discountIn: number;
	private _discountOut: number;
	private _taxIn: number;
	private _taxOut: number;
	private _totalIn: number;
	private _totalOut: number;
	private _totalsumIn: number;
	private _totalsumOut: number;
	private _currencyCod: string;
	private _currencyTitle: string;
	private _currencySymbol: string;
	private _currencyIcon: string;
	private _deposit: number;
	private _payed: number;
	private _payments: PaymentModel[];

	/**
	 * Getter priceIn
	 * @return {number}
	 */
	public get priceIn(): number {
		return this._priceIn;
	}

	/**
	 * Getter priceOut
	 * @return {number}
	 */
	public get priceOut(): number {
		return this._priceOut;
	}

	/**
	 * Getter ivaIn
	 * @return {number}
	 */
	public get ivaIn(): number {
		return this._ivaIn;
	}

	/**
	 * Getter ivaOut
	 * @return {number}
	 */
	public get ivaOut(): number {
		return this._ivaOut;
	}

	/**
	 * Getter discountIn
	 * @return {number}
	 */
	public get discountIn(): number {
		return this._discountIn;
	}

	/**
	 * Getter discountOut
	 * @return {number}
	 */
	public get discountOut(): number {
		return this._discountOut;
	}

	/**
	 * Getter taxIn
	 * @return {number}
	 */
	public get taxIn(): number {
		return this._taxIn;
	}

	/**
	 * Getter taxOut
	 * @return {number}
	 */
	public get taxOut(): number {
		return this._taxOut;
	}

	/**
	 * Getter totalIn
	 * @return {number}
	 */
	public get totalIn(): number {
		return this._totalIn;
	}

	/**
	 * Getter totalOut
	 * @return {number}
	 */
	public get totalOut(): number {
		return this._totalOut;
	}

	/**
	 * Getter totalsumIn
	 * @return {number}
	 */
	public get totalsumIn(): number {
		return this._totalsumIn;
	}

	/**
	 * Getter totalsumOut
	 * @return {number}
	 */
	public get totalsumOut(): number {
		return this._totalsumOut;
	}

	/**
	 * Getter currencyCod
	 * @return {string}
	 */
	public get currencyCod(): string {
		return this._currencyCod;
	}

	/**
	 * Getter currencyTitle
	 * @return {string}
	 */
	public get currencyTitle(): string {
		return this._currencyTitle;
	}

	/**
	 * Getter currencySymbol
	 * @return {string}
	 */
	public get currencySymbol(): string {
		return this._currencySymbol;
	}

	/**
	 * Getter currencyIcon
	 * @return {string}
	 */
	public get currencyIcon(): string {
		return this._currencyIcon;
	}

	/**
	 * Getter deposit
	 * @return {number}
	 */
	public get deposit(): number {
		return this._deposit;
	}

	/**
	 * Getter payed
	 * @return {number}
	 */
	public get payed(): number {
		return this._payed;
	}

	/**
	 * Getter payments
	 * @return {PaymentModel[]}
	 */
	public get payments(): PaymentModel[] {
		return this._payments;
	}

	/**
	 * Setter priceIn
	 * @param {number} value
	 */
	public set priceIn(value: number) {
		this._priceIn = value;
	}

	/**
	 * Setter priceOut
	 * @param {number} value
	 */
	public set priceOut(value: number) {
		this._priceOut = value;
	}

	/**
	 * Setter ivaIn
	 * @param {number} value
	 */
	public set ivaIn(value: number) {
		this._ivaIn = value;
	}

	/**
	 * Setter ivaOut
	 * @param {number} value
	 */
	public set ivaOut(value: number) {
		this._ivaOut = value;
	}

	/**
	 * Setter discountIn
	 * @param {number} value
	 */
	public set discountIn(value: number) {
		this._discountIn = value;
	}

	/**
	 * Setter discountOut
	 * @param {number} value
	 */
	public set discountOut(value: number) {
		this._discountOut = value;
	}

	/**
	 * Setter taxIn
	 * @param {number} value
	 */
	public set taxIn(value: number) {
		this._taxIn = value;
	}

	/**
	 * Setter taxOut
	 * @param {number} value
	 */
	public set taxOut(value: number) {
		this._taxOut = value;
	}

	/**
	 * Setter totalIn
	 * @param {number} value
	 */
	public set totalIn(value: number) {
		this._totalIn = value;
	}

	/**
	 * Setter totalOut
	 * @param {number} value
	 */
	public set totalOut(value: number) {
		this._totalOut = value;
	}

	/**
	 * Setter totalsumIn
	 * @param {number} value
	 */
	public set totalsumIn(value: number) {
		this._totalsumIn = value;
	}

	/**
	 * Setter totalsumOut
	 * @param {number} value
	 */
	public set totalsumOut(value: number) {
		this._totalsumOut = value;
	}

	/**
	 * Setter currencyCod
	 * @param {string} value
	 */
	public set currencyCod(value: string) {
		this._currencyCod = value;
	}

	/**
	 * Setter currencyTitle
	 * @param {string} value
	 */
	public set currencyTitle(value: string) {
		this._currencyTitle = value;
	}

	/**
	 * Setter currencySymbol
	 * @param {string} value
	 */
	public set currencySymbol(value: string) {
		this._currencySymbol = value;
	}

	/**
	 * Setter currencyIcon
	 * @param {string} value
	 */
	public set currencyIcon(value: string) {
		this._currencyIcon = value;
	}

	/**
	 * Setter deposit
	 * @param {number} value
	 */
	public set deposit(value: number) {
		this._deposit = value;
	}

	/**
	 * Setter payed
	 * @param {number} value
	 */
	public set payed(value: number) {
		this._payed = value;
	}

	/**
	 * Setter payments
	 * @param {PaymentModel[]} value
	 */
	public set payments(value: PaymentModel[]) {
		this._payments = value;
	}
}
