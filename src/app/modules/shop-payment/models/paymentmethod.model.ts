import { ApiModel } from '../../api/cakeutils/base/api.model';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { UserModel } from '../../authentication/models/user.model';
import { ActivityModel } from '../../authentication/models/activity.model';

export class PaymentmethodModel extends ApiModel {
	private _cod: string;
	private _name: string;
	private _intest: string;
	private _description: string;
	private _tppaymentmethod: TypologicalModel;
	private _tpwebpayment: TypologicalModel;
	private _user: UserModel;
	private _activity: ActivityModel;
	private _email: string;
	private _account_id: string;
	private _iban: string;
	private _bban: string;
	private _swift_bic: string;
	private _swift: string;
	private _bic: string;
	private _abi: string;
	private _cab: string;
	private _cin: string;
	private _bank: string;
	private _bank_address: string;
	private _cc: string;
	private _card: string;
	private _card_number: string;
	private _card_deadline_m: string;
	private _card_deadline_y: string;
	private _cvv: string;
	private _cvv2: string;
	private _cvc: string;
	private _typein: boolean;
	private _typeout: boolean;
	private _flgonline: boolean;
	private _flgdefault: boolean;
	private _signin: string;
	private _signout: string;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter name
	 * @return {string}
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Getter intest
	 * @return {string}
	 */
	public get intest(): string {
		return this._intest;
	}

	/**
	 * Getter description
	 * @return {string}
	 */
	public get description(): string {
		return this._description;
	}

	/**
	 * Getter tppaymentmethod
	 * @return {TypologicalModel}
	 */
	public get tppaymentmethod(): TypologicalModel {
		return this._tppaymentmethod;
	}

	/**
	 * Getter tpwebpayment
	 * @return {TypologicalModel}
	 */
	public get tpwebpayment(): TypologicalModel {
		return this._tpwebpayment;
	}

	/**
	 * Getter user
	 * @return {UserModel}
	 */
	public get user(): UserModel {
		return this._user;
	}

	/**
	 * Getter activity
	 * @return {ActivityModel}
	 */
	public get activity(): ActivityModel {
		return this._activity;
	}

	/**
	 * Getter email
	 * @return {string}
	 */
	public get email(): string {
		return this._email;
	}

	/**
	 * Getter account_id
	 * @return {string}
	 */
	public get account_id(): string {
		return this._account_id;
	}

	/**
	 * Getter iban
	 * @return {string}
	 */
	public get iban(): string {
		return this._iban;
	}

	/**
	 * Getter bban
	 * @return {string}
	 */
	public get bban(): string {
		return this._bban;
	}

	/**
	 * Getter swift_bic
	 * @return {string}
	 */
	public get swift_bic(): string {
		return this._swift_bic;
	}

	/**
	 * Getter swift
	 * @return {string}
	 */
	public get swift(): string {
		return this._swift;
	}

	/**
	 * Getter bic
	 * @return {string}
	 */
	public get bic(): string {
		return this._bic;
	}

	/**
	 * Getter abi
	 * @return {string}
	 */
	public get abi(): string {
		return this._abi;
	}

	/**
	 * Getter cab
	 * @return {string}
	 */
	public get cab(): string {
		return this._cab;
	}

	/**
	 * Getter cin
	 * @return {string}
	 */
	public get cin(): string {
		return this._cin;
	}

	/**
	 * Getter bank
	 * @return {string}
	 */
	public get bank(): string {
		return this._bank;
	}

	/**
	 * Getter bank_address
	 * @return {string}
	 */
	public get bank_address(): string {
		return this._bank_address;
	}

	/**
	 * Getter cc
	 * @return {string}
	 */
	public get cc(): string {
		return this._cc;
	}

	/**
	 * Getter card
	 * @return {string}
	 */
	public get card(): string {
		return this._card;
	}

	/**
	 * Getter card_number
	 * @return {string}
	 */
	public get card_number(): string {
		return this._card_number;
	}

	/**
	 * Getter card_deadline_m
	 * @return {string}
	 */
	public get card_deadline_m(): string {
		return this._card_deadline_m;
	}

	/**
	 * Getter card_deadline_y
	 * @return {string}
	 */
	public get card_deadline_y(): string {
		return this._card_deadline_y;
	}

	/**
	 * Getter cvv
	 * @return {string}
	 */
	public get cvv(): string {
		return this._cvv;
	}

	/**
	 * Getter cvv2
	 * @return {string}
	 */
	public get cvv2(): string {
		return this._cvv2;
	}

	/**
	 * Getter cvc
	 * @return {string}
	 */
	public get cvc(): string {
		return this._cvc;
	}

	/**
	 * Getter typein
	 * @return {boolean}
	 */
	public get typein(): boolean {
		return this._typein;
	}

	/**
	 * Getter typeout
	 * @return {boolean}
	 */
	public get typeout(): boolean {
		return this._typeout;
	}

	/**
	 * Getter flgonline
	 * @return {boolean}
	 */
	public get flgonline(): boolean {
		return this._flgonline;
	}

	/**
	 * Getter flgdefault
	 * @return {boolean}
	 */
	public get flgdefault(): boolean {
		return this._flgdefault;
	}

	/**
	 * Getter signin
	 * @return {string}
	 */
	public get signin(): string {
		return this._signin;
	}

	/**
	 * Getter signout
	 * @return {string}
	 */
	public get signout(): string {
		return this._signout;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter name
	 * @param {string} value
	 */
	public set name(value: string) {
		this._name = value;
	}

	/**
	 * Setter intest
	 * @param {string} value
	 */
	public set intest(value: string) {
		this._intest = value;
	}

	/**
	 * Setter description
	 * @param {string} value
	 */
	public set description(value: string) {
		this._description = value;
	}

	/**
	 * Setter tppaymentmethod
	 * @param {TypologicalModel} value
	 */
	public set tppaymentmethod(value: TypologicalModel) {
		this._tppaymentmethod = value;
	}

	/**
	 * Setter tpwebpayment
	 * @param {TypologicalModel} value
	 */
	public set tpwebpayment(value: TypologicalModel) {
		this._tpwebpayment = value;
	}

	/**
	 * Setter user
	 * @param {UserModel} value
	 */
	public set user(value: UserModel) {
		this._user = value;
	}

	/**
	 * Setter activity
	 * @param {ActivityModel} value
	 */
	public set activity(value: ActivityModel) {
		this._activity = value;
	}

	/**
	 * Setter email
	 * @param {string} value
	 */
	public set email(value: string) {
		this._email = value;
	}

	/**
	 * Setter account_id
	 * @param {string} value
	 */
	public set account_id(value: string) {
		this._account_id = value;
	}

	/**
	 * Setter iban
	 * @param {string} value
	 */
	public set iban(value: string) {
		this._iban = value;
	}

	/**
	 * Setter bban
	 * @param {string} value
	 */
	public set bban(value: string) {
		this._bban = value;
	}

	/**
	 * Setter swift_bic
	 * @param {string} value
	 */
	public set swift_bic(value: string) {
		this._swift_bic = value;
	}

	/**
	 * Setter swift
	 * @param {string} value
	 */
	public set swift(value: string) {
		this._swift = value;
	}

	/**
	 * Setter bic
	 * @param {string} value
	 */
	public set bic(value: string) {
		this._bic = value;
	}

	/**
	 * Setter abi
	 * @param {string} value
	 */
	public set abi(value: string) {
		this._abi = value;
	}

	/**
	 * Setter cab
	 * @param {string} value
	 */
	public set cab(value: string) {
		this._cab = value;
	}

	/**
	 * Setter cin
	 * @param {string} value
	 */
	public set cin(value: string) {
		this._cin = value;
	}

	/**
	 * Setter bank
	 * @param {string} value
	 */
	public set bank(value: string) {
		this._bank = value;
	}

	/**
	 * Setter bank_address
	 * @param {string} value
	 */
	public set bank_address(value: string) {
		this._bank_address = value;
	}

	/**
	 * Setter cc
	 * @param {string} value
	 */
	public set cc(value: string) {
		this._cc = value;
	}

	/**
	 * Setter card
	 * @param {string} value
	 */
	public set card(value: string) {
		this._card = value;
	}

	/**
	 * Setter card_number
	 * @param {string} value
	 */
	public set card_number(value: string) {
		this._card_number = value;
	}

	/**
	 * Setter card_deadline_m
	 * @param {string} value
	 */
	public set card_deadline_m(value: string) {
		this._card_deadline_m = value;
	}

	/**
	 * Setter card_deadline_y
	 * @param {string} value
	 */
	public set card_deadline_y(value: string) {
		this._card_deadline_y = value;
	}

	/**
	 * Setter cvv
	 * @param {string} value
	 */
	public set cvv(value: string) {
		this._cvv = value;
	}

	/**
	 * Setter cvv2
	 * @param {string} value
	 */
	public set cvv2(value: string) {
		this._cvv2 = value;
	}

	/**
	 * Setter cvc
	 * @param {string} value
	 */
	public set cvc(value: string) {
		this._cvc = value;
	}

	/**
	 * Setter typein
	 * @param {boolean} value
	 */
	public set typein(value: boolean) {
		this._typein = value;
	}

	/**
	 * Setter typeout
	 * @param {boolean} value
	 */
	public set typeout(value: boolean) {
		this._typeout = value;
	}

	/**
	 * Setter flgonline
	 * @param {boolean} value
	 */
	public set flgonline(value: boolean) {
		this._flgonline = value;
	}

	/**
	 * Setter flgdefault
	 * @param {boolean} value
	 */
	public set flgdefault(value: boolean) {
		this._flgdefault = value;
	}

	/**
	 * Setter signin
	 * @param {string} value
	 */
	public set signin(value: string) {
		this._signin = value;
	}

	/**
	 * Setter signout
	 * @param {string} value
	 */
	public set signout(value: string) {
		this._signout = value;
	}
}
