import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ActivityModel } from './activity.model';
import { ContactreferenceModel } from './contactreference.model';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { EnumContactreferenceType } from '../enums/contactreference-type.enum';

export class ActivityreferenceModel extends ApiModel {
	private _cod: string;
	private _flgprincipal: boolean;
	private _activity: ActivityModel;
	private _contactreference: ContactreferenceModel;
	private _tpcontactreference: TypologicalModel;
	private _group: string;
	// enums
	private _tpcontactreferenceEnum: EnumContactreferenceType;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter flgprincipal
	 * @return {boolean}
	 */
	public get flgprincipal(): boolean {
		return this._flgprincipal;
	}

	/**
	 * Getter activity
	 * @return {ActivityModel}
	 */
	public get activity(): ActivityModel {
		return this._activity;
	}

	/**
	 * Getter contactreference
	 * @return {ContactreferenceModel}
	 */
	public get contactreference(): ContactreferenceModel {
		return this._contactreference;
	}

	/**
	 * Getter tpcontactreference
	 * @return {TypologicalModel}
	 */
	public get tpcontactreference(): TypologicalModel {
		return this._tpcontactreference;
	}

	/**
	 * Getter group
	 * @return {string}
	 */
	public get group(): string {
		return this._group;
	}

	/**
	 * Getter tpcontactreferenceEnum
	 * @return {EnumContactreferenceType}
	 */
	public get tpcontactreferenceEnum(): EnumContactreferenceType {
		return this._tpcontactreferenceEnum;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter flgprincipal
	 * @param {boolean} value
	 */
	public set flgprincipal(value: boolean) {
		this._flgprincipal = value;
	}

	/**
	 * Setter activity
	 * @param {ActivityModel} value
	 */
	public set activity(value: ActivityModel) {
		this._activity = value;
	}

	/**
	 * Setter contactreference
	 * @param {ContactreferenceModel} value
	 */
	public set contactreference(value: ContactreferenceModel) {
		this._contactreference = value;
	}

	/**
	 * Setter tpcontactreference
	 * @param {TypologicalModel} value
	 */
	public set tpcontactreference(value: TypologicalModel) {
		this._tpcontactreference = value;
	}

	/**
	 * Setter group
	 * @param {string} value
	 */
	public set group(value: string) {
		this._group = value;
	}

	/**
	 * Setter tpcontactreferenceEnum
	 * @param {EnumContactreferenceType} value
	 */
	public set tpcontactreferenceEnum(value: EnumContactreferenceType) {
		this._tpcontactreferenceEnum = value;
	}
}
