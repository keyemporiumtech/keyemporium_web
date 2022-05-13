import { ApiModel } from '../../api/cakeutils/base/api.model';
import { PriceModel } from '../../shop-warehouse/models/price.model';
import { PaymentmethodModel } from './paymentmethod.model';
import { UserModel } from '../../authentication/models/user.model';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { DateModel } from '@ddc/kit';

export class PaymentModel extends ApiModel {
	private _cod: string;
	private _price: PriceModel;
	private _flgin: boolean;
	private _paymentmethod: PaymentmethodModel;
	private _dtapayment: string;
	private _note: string;
	private _causal: string;
	private _bank_sender: string;
	private _bank_receiver: string;
	private _flgconfirm: boolean;
	private _user: UserModel;
	private _tppayment: TypologicalModel;
	// virtualfields
	private _balance_id: string;

	public get dtapaymentModel(): DateModel {
		return new DateModel(this.dtapayment);
	}
	public get dtapaymentFormat(): string {
		const dateModel = new DateModel(this.dtapayment);
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
	 * Getter price
	 * @return {PriceModel}
	 */
	public get price(): PriceModel {
		return this._price;
	}

	/**
	 * Getter flgin
	 * @return {boolean}
	 */
	public get flgin(): boolean {
		return this._flgin;
	}

	/**
	 * Getter paymentmethod
	 * @return {PaymentmethodModel}
	 */
	public get paymentmethod(): PaymentmethodModel {
		return this._paymentmethod;
	}

	/**
	 * Getter dtapayment
	 * @return {string}
	 */
	public get dtapayment(): string {
		return this._dtapayment;
	}

	/**
	 * Getter note
	 * @return {string}
	 */
	public get note(): string {
		return this._note;
	}

	/**
	 * Getter causal
	 * @return {string}
	 */
	public get causal(): string {
		return this._causal;
	}

	/**
	 * Getter bank_sender
	 * @return {string}
	 */
	public get bank_sender(): string {
		return this._bank_sender;
	}

	/**
	 * Getter bank_receiver
	 * @return {string}
	 */
	public get bank_receiver(): string {
		return this._bank_receiver;
	}

	/**
	 * Getter flgconfirm
	 * @return {boolean}
	 */
	public get flgconfirm(): boolean {
		return this._flgconfirm;
	}

	/**
	 * Getter user
	 * @return {UserModel}
	 */
	public get user(): UserModel {
		return this._user;
	}

	/**
	 * Getter tppayment
	 * @return {TypologicalModel}
	 */
	public get tppayment(): TypologicalModel {
		return this._tppayment;
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
	 * @param {PriceModel} value
	 */
	public set price(value: PriceModel) {
		this._price = value;
	}

	/**
	 * Setter flgin
	 * @param {boolean} value
	 */
	public set flgin(value: boolean) {
		this._flgin = value;
	}

	/**
	 * Setter paymentmethod
	 * @param {PaymentmethodModel} value
	 */
	public set paymentmethod(value: PaymentmethodModel) {
		this._paymentmethod = value;
	}

	/**
	 * Setter dtapayment
	 * @param {string} value
	 */
	public set dtapayment(value: string) {
		this._dtapayment = value;
	}

	/**
	 * Setter note
	 * @param {string} value
	 */
	public set note(value: string) {
		this._note = value;
	}

	/**
	 * Setter causal
	 * @param {string} value
	 */
	public set causal(value: string) {
		this._causal = value;
	}

	/**
	 * Setter bank_sender
	 * @param {string} value
	 */
	public set bank_sender(value: string) {
		this._bank_sender = value;
	}

	/**
	 * Setter bank_receiver
	 * @param {string} value
	 */
	public set bank_receiver(value: string) {
		this._bank_receiver = value;
	}

	/**
	 * Setter flgconfirm
	 * @param {boolean} value
	 */
	public set flgconfirm(value: boolean) {
		this._flgconfirm = value;
	}

	/**
	 * Setter user
	 * @param {UserModel} value
	 */
	public set user(value: UserModel) {
		this._user = value;
	}

	/**
	 * Setter tppayment
	 * @param {TypologicalModel} value
	 */
	public set tppayment(value: TypologicalModel) {
		this._tppayment = value;
	}

	/**
	 * Getter balance_id
	 * @return {string}
	 */
	public get balance_id(): string {
		return this._balance_id;
	}

	/**
	 * Setter balance_id
	 * @param {string} value
	 */
	public set balance_id(value: string) {
		this._balance_id = value;
	}
}
