import { DateModel } from '@ddc/kit';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { ApiModel } from '../../api/cakeutils/base/api.model';
import { BalanceModel } from '../../shop-payment/models/balance.model';
import { BasketModel } from '../../shop-payment/models/basket.model';
import { PriceModel } from '../../shop-warehouse/models/price.model';
import { CurrencyModel } from '../../util-currency/models/currency.model';
import { DocactorModel } from './docactor.model';

export class BalancedocModel extends ApiModel {
	private _cod: string;
	private _actorsender: DocactorModel;
	private _actorreceiver: DocactorModel;
	private _causal: string;
	private _bank: string;
	private _price: PriceModel;
	private _deposit: number;
	private _payed: number;
	private _dtainit: string;
	private _dtaend: string;
	private _tpbalancedoc: TypologicalModel;
	private _associated: BalancedocModel;
	private _payclose: boolean;
	private _balance: BalanceModel;
	private _flgtotalbyentry: boolean;
	private _flgin: boolean;
	private _currency: CurrencyModel;
	private _basket: BasketModel;

	public get dtainitModel(): DateModel {
		return new DateModel(this.dtainit);
	}
	public get dtainitFormat(): string {
		const dateModel = new DateModel(this.dtainit);
		return dateModel.toString();
	}

	public get dtaendModel(): DateModel {
		return new DateModel(this.dtaend);
	}
	public get dtaendFormat(): string {
		const dateModel = new DateModel(this.dtaend);
		return dateModel.toString();
	}

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter actorsender
	 * @return {DocactorModel}
	 */
	public get actorsender(): DocactorModel {
		return this._actorsender;
	}

	/**
	 * Getter actorreceiver
	 * @return {DocactorModel}
	 */
	public get actorreceiver(): DocactorModel {
		return this._actorreceiver;
	}

	/**
	 * Getter causal
	 * @return {string}
	 */
	public get causal(): string {
		return this._causal;
	}

	/**
	 * Getter bank
	 * @return {string}
	 */
	public get bank(): string {
		return this._bank;
	}

	/**
	 * Getter price
	 * @return {PriceModel}
	 */
	public get price(): PriceModel {
		return this._price;
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
	 * Getter tpbalancedoc
	 * @return {TypologicalModel}
	 */
	public get tpbalancedoc(): TypologicalModel {
		return this._tpbalancedoc;
	}

	/**
	 * Getter associated
	 * @return {BalancedocModel}
	 */
	public get associated(): BalancedocModel {
		return this._associated;
	}

	/**
	 * Getter payclose
	 * @return {boolean}
	 */
	public get payclose(): boolean {
		return this._payclose;
	}

	/**
	 * Getter balance
	 * @return {BalanceModel}
	 */
	public get balance(): BalanceModel {
		return this._balance;
	}

	/**
	 * Getter flgtotalbyentry
	 * @return {boolean}
	 */
	public get flgtotalbyentry(): boolean {
		return this._flgtotalbyentry;
	}

	/**
	 * Getter flgin
	 * @return {boolean}
	 */
	public get flgin(): boolean {
		return this._flgin;
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
	 * Setter actorsender
	 * @param {DocactorModel} value
	 */
	public set actorsender(value: DocactorModel) {
		this._actorsender = value;
	}

	/**
	 * Setter actorreceiver
	 * @param {DocactorModel} value
	 */
	public set actorreceiver(value: DocactorModel) {
		this._actorreceiver = value;
	}

	/**
	 * Setter causal
	 * @param {string} value
	 */
	public set causal(value: string) {
		this._causal = value;
	}

	/**
	 * Setter bank
	 * @param {string} value
	 */
	public set bank(value: string) {
		this._bank = value;
	}

	/**
	 * Setter price
	 * @param {PriceModel} value
	 */
	public set price(value: PriceModel) {
		this._price = value;
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
	 * Setter tpbalancedoc
	 * @param {TypologicalModel} value
	 */
	public set tpbalancedoc(value: TypologicalModel) {
		this._tpbalancedoc = value;
	}

	/**
	 * Setter associated
	 * @param {BalancedocModel} value
	 */
	public set associated(value: BalancedocModel) {
		this._associated = value;
	}

	/**
	 * Setter payclose
	 * @param {boolean} value
	 */
	public set payclose(value: boolean) {
		this._payclose = value;
	}

	/**
	 * Setter balance
	 * @param {BalanceModel} value
	 */
	public set balance(value: BalanceModel) {
		this._balance = value;
	}

	/**
	 * Setter flgtotalbyentry
	 * @param {boolean} value
	 */
	public set flgtotalbyentry(value: boolean) {
		this._flgtotalbyentry = value;
	}

	/**
	 * Setter flgin
	 * @param {boolean} value
	 */
	public set flgin(value: boolean) {
		this._flgin = value;
	}

	/**
	 * Setter currency
	 * @param {CurrencyModel} value
	 */
	public set currency(value: CurrencyModel) {
		this._currency = value;
	}

	/**
	 * Getter basket
	 * @return {BasketModel}
	 */
	public get basket(): BasketModel {
		return this._basket;
	}

	/**
	 * Setter basket
	 * @param {BasketModel} value
	 */
	public set basket(value: BasketModel) {
		this._basket = value;
	}
}
