import { ApiModel } from '../../api/cakeutils/base/api.model';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { EnumContactreferenceType } from '../enums/contactreference-type.enum';
import { EnumSocialreferenceType } from '../enums/socialreference-type.enum';

export class ContactreferenceModel extends ApiModel {
	private _cod: string;
	private _val: string;
	private _description: string;
	private _tpcontactreference: TypologicalModel;
	private _tpsocialreference: TypologicalModel;
	private _prefix: string;
	private _flgused: boolean;
	// enums
	private _tpcontactreferenceEnum: EnumContactreferenceType;
	private _tpsocialreferenceEnum: EnumSocialreferenceType;
	// added
	private _nationimage: string; // base64
	private _referenceimage: string; // base64
	private _socialimage: string; // base64

	get text(): string {
		if (
			this.tpcontactreferenceEnum === EnumContactreferenceType.TEL ||
			this.tpcontactreferenceEnum === EnumContactreferenceType.CEL ||
			this.tpcontactreferenceEnum === EnumContactreferenceType.FAX
		) {
			return this.prefix + ' ' + this.val;
		}
		return this.val;
	}

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter val
	 * @return {string}
	 */
	public get val(): string {
		return this._val;
	}

	/**
	 * Getter description
	 * @return {string}
	 */
	public get description(): string {
		return this._description;
	}

	/**
	 * Getter tpcontactreference
	 * @return {TypologicalModel}
	 */
	public get tpcontactreference(): TypologicalModel {
		return this._tpcontactreference;
	}

	/**
	 * Getter tpsocialreference
	 * @return {TypologicalModel}
	 */
	public get tpsocialreference(): TypologicalModel {
		return this._tpsocialreference;
	}

	/**
	 * Getter prefix
	 * @return {string}
	 */
	public get prefix(): string {
		return this._prefix;
	}

	/**
	 * Getter flgused
	 * @return {boolean}
	 */
	public get flgused(): boolean {
		return this._flgused;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter val
	 * @param {string} value
	 */
	public set val(value: string) {
		this._val = value;
	}

	/**
	 * Setter description
	 * @param {string} value
	 */
	public set description(value: string) {
		this._description = value;
	}

	/**
	 * Setter tpcontactreference
	 * @param {TypologicalModel} value
	 */
	public set tpcontactreference(value: TypologicalModel) {
		this._tpcontactreference = value;
	}

	/**
	 * Setter tpsocialreference
	 * @param {TypologicalModel} value
	 */
	public set tpsocialreference(value: TypologicalModel) {
		this._tpsocialreference = value;
	}

	/**
	 * Setter prefix
	 * @param {string} value
	 */
	public set prefix(value: string) {
		this._prefix = value;
	}

	/**
	 * Setter flgused
	 * @param {boolean} value
	 */
	public set flgused(value: boolean) {
		this._flgused = value;
	}

	/**
	 * Getter nationimage
	 * @return {string}
	 */
	public get nationimage(): string {
		return this._nationimage;
	}

	/**
	 * Getter referenceimage
	 * @return {string}
	 */
	public get referenceimage(): string {
		return this._referenceimage;
	}

	/**
	 * Getter socialimage
	 * @return {string}
	 */
	public get socialimage(): string {
		return this._socialimage;
	}

	/**
	 * Setter nationimage
	 * @param {string} value
	 */
	public set nationimage(value: string) {
		this._nationimage = value;
	}

	/**
	 * Setter referenceimage
	 * @param {string} value
	 */
	public set referenceimage(value: string) {
		this._referenceimage = value;
	}

	/**
	 * Setter socialimage
	 * @param {string} value
	 */
	public set socialimage(value: string) {
		this._socialimage = value;
	}

	/**
	 * Getter tpcontactreferenceEnum
	 * @return {EnumContactreferenceType}
	 */
	public get tpcontactreferenceEnum(): EnumContactreferenceType {
		return this._tpcontactreferenceEnum;
	}

	/**
	 * Getter tpsocialreferenceEnum
	 * @return {EnumSocialreferenceType}
	 */
	public get tpsocialreferenceEnum(): EnumSocialreferenceType {
		return this._tpsocialreferenceEnum;
	}

	/**
	 * Setter tpcontactreferenceEnum
	 * @param {EnumContactreferenceType} value
	 */
	public set tpcontactreferenceEnum(value: EnumContactreferenceType) {
		this._tpcontactreferenceEnum = value;
	}

	/**
	 * Setter tpsocialreferenceEnum
	 * @param {EnumSocialreferenceType} value
	 */
	public set tpsocialreferenceEnum(value: EnumSocialreferenceType) {
		this._tpsocialreferenceEnum = value;
	}
}
