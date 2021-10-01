import { ApiModel } from '../../api/cakeutils/base/api.model';
import { EnumIbanOrg } from '../enums/iban-org.enum';

export class IbanModel extends ApiModel {
	private _input: string;
	private _iban: string;
	private _bban: string;
	private _swift_bic: string;
	private _swift: string;
	private _bic: string;
	private _abi: string;
	private _cab: string;
	private _cin: string;
	private _cc: string;
	private _bankcod: string;
	private _bankorg: string; /* codice filiale/codice sportello/codice agenzia/Code guichet */
	private _labelorg_cod: string; /* EnumIBANOrg */
	private _controlkey: string; /* chiave di controllo */
	private _controlkey2: string; /* seconda chiave di controllo */
	private _controlnumbers: string; /* numeri di controllo */
	private _controlcod: string; /* codice di controllo */
	private _id_national_owner: string; /* id nazionale del proprietario */
	private _cod_iso3166: string;
	private _pattern: string; /* FIELD1-INITSTRING-ENDSTRING|FIELD2-INITSTRING-ENDSTRING */
	private _labelpattern: string; /* FIELD1-KEY_TRANSLATE|FIELD2-KEY_TRANSLATE*/
	private _length: number;
	private _labels: any;

	// enums
	private _tporg: EnumIbanOrg;

	patternDecompose(separator?: string): string {
		let label = '';
		Object.keys(this.labels).forEach((key) => {
			label += this.labels[key] + ':' + this[key] + (separator ? separator : ',');
		});
		return label;
	}

	/**
	 * Getter input
	 * @return {string}
	 */
	public get input(): string {
		return this._input;
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
	 * Getter cc
	 * @return {string}
	 */
	public get cc(): string {
		return this._cc;
	}

	/**
	 * Getter bankcod
	 * @return {string}
	 */
	public get bankcod(): string {
		return this._bankcod;
	}

	/**
	 * Getter bankorg
	 * @return {string}
	 */
	public get bankorg(): string {
		return this._bankorg;
	}

	/**
	 * Getter labelorg_cod
	 * @return {string}
	 */
	public get labelorg_cod(): string {
		return this._labelorg_cod;
	}

	/**
	 * Getter controlkey
	 * @return {string}
	 */
	public get controlkey(): string {
		return this._controlkey;
	}

	/**
	 * Getter controlkey2
	 * @return {string}
	 */
	public get controlkey2(): string {
		return this._controlkey2;
	}

	/**
	 * Getter controlnumbers
	 * @return {string}
	 */
	public get controlnumbers(): string {
		return this._controlnumbers;
	}

	/**
	 * Getter controlcod
	 * @return {string}
	 */
	public get controlcod(): string {
		return this._controlcod;
	}

	/**
	 * Getter id_national_owner
	 * @return {string}
	 */
	public get id_national_owner(): string {
		return this._id_national_owner;
	}

	/**
	 * Getter cod_iso3166
	 * @return {string}
	 */
	public get cod_iso3166(): string {
		return this._cod_iso3166;
	}

	/**
	 * Getter pattern
	 * @return {string}
	 */
	public get pattern(): string {
		return this._pattern;
	}

	/**
	 * Getter labelpattern
	 * @return {string}
	 */
	public get labelpattern(): string {
		return this._labelpattern;
	}

	/**
	 * Getter length
	 * @return {number}
	 */
	public get length(): number {
		return this._length;
	}

	/**
	 * Getter labels
	 * @return {any}
	 */
	public get labels(): any {
		return this._labels;
	}

	/**
	 * Getter tporg
	 * @return {EnumIbanOrg}
	 */
	public get tporg(): EnumIbanOrg {
		return this._tporg;
	}

	/**
	 * Setter input
	 * @param {string} value
	 */
	public set input(value: string) {
		this._input = value;
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
	 * Setter cc
	 * @param {string} value
	 */
	public set cc(value: string) {
		this._cc = value;
	}

	/**
	 * Setter bankcod
	 * @param {string} value
	 */
	public set bankcod(value: string) {
		this._bankcod = value;
	}

	/**
	 * Setter bankorg
	 * @param {string} value
	 */
	public set bankorg(value: string) {
		this._bankorg = value;
	}

	/**
	 * Setter labelorg_cod
	 * @param {string} value
	 */
	public set labelorg_cod(value: string) {
		this._labelorg_cod = value;
	}

	/**
	 * Setter controlkey
	 * @param {string} value
	 */
	public set controlkey(value: string) {
		this._controlkey = value;
	}

	/**
	 * Setter controlkey2
	 * @param {string} value
	 */
	public set controlkey2(value: string) {
		this._controlkey2 = value;
	}

	/**
	 * Setter controlnumbers
	 * @param {string} value
	 */
	public set controlnumbers(value: string) {
		this._controlnumbers = value;
	}

	/**
	 * Setter controlcod
	 * @param {string} value
	 */
	public set controlcod(value: string) {
		this._controlcod = value;
	}

	/**
	 * Setter id_national_owner
	 * @param {string} value
	 */
	public set id_national_owner(value: string) {
		this._id_national_owner = value;
	}

	/**
	 * Setter cod_iso3166
	 * @param {string} value
	 */
	public set cod_iso3166(value: string) {
		this._cod_iso3166 = value;
	}

	/**
	 * Setter pattern
	 * @param {string} value
	 */
	public set pattern(value: string) {
		this._pattern = value;
	}

	/**
	 * Setter labelpattern
	 * @param {string} value
	 */
	public set labelpattern(value: string) {
		this._labelpattern = value;
	}

	/**
	 * Setter length
	 * @param {number} value
	 */
	public set length(value: number) {
		this._length = value;
	}

	/**
	 * Setter labels
	 * @param {any} value
	 */
	public set labels(value: any) {
		this._labels = value;
	}

	/**
	 * Setter tporg
	 * @param {EnumIbanOrg} value
	 */
	public set tporg(value: EnumIbanOrg) {
		this._tporg = value;
	}
}
