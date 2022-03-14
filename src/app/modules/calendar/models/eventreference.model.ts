import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ContactreferenceModel } from '../../authentication/models/contactreference.model';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { EventModel } from './event.model';
import { EnumContactreferenceType } from '../../authentication/enums/contactreference-type.enum';

export class EventreferenceModel extends ApiModel {
	private _cod: string;
	private _flgprincipal: boolean;
	private _contactreference: ContactreferenceModel;
	private _tpcontactreference: TypologicalModel;
	private _event: EventModel;
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
	 * Getter event
	 * @return {EventModel}
	 */
	public get event(): EventModel {
		return this._event;
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
	 * Setter event
	 * @param {EventModel} value
	 */
	public set event(value: EventModel) {
		this._event = value;
	}

	/**
	 * Setter tpcontactreferenceEnum
	 * @param {EnumContactreferenceType} value
	 */
	public set tpcontactreferenceEnum(value: EnumContactreferenceType) {
		this._tpcontactreferenceEnum = value;
	}
}
