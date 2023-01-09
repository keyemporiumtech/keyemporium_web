import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { ApiModel } from '../../api/cakeutils/base/api.model';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { EventModel } from './event.model';
import { EnumAttachmentType } from '../../resources/enums/attachment-type.enum';

export class EventattachmentModel extends ApiModel {
	private _cod: string;
	private _flgprincipal: boolean; // boolean
	private _attachment: AttachmentModel;
	private _tpattachment: TypologicalModel;
	private _event: EventModel;
	// enums
	private _tpattachmentEnum: EnumAttachmentType;

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
	 * Getter attachment
	 * @return {AttachmentModel}
	 */
	public get attachment(): AttachmentModel {
		return this._attachment;
	}

	/**
	 * Getter tpattachment
	 * @return {TypologicalModel}
	 */
	public get tpattachment(): TypologicalModel {
		return this._tpattachment;
	}

	/**
	 * Getter event
	 * @return {EventModel}
	 */
	public get event(): EventModel {
		return this._event;
	}

	/**
	 * Getter tpattachmentEnum
	 * @return {EnumAttachmentType}
	 */
	public get tpattachmentEnum(): EnumAttachmentType {
		return this._tpattachmentEnum;
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
	 * Setter attachment
	 * @param {AttachmentModel} value
	 */
	public set attachment(value: AttachmentModel) {
		this._attachment = value;
	}

	/**
	 * Setter tpattachment
	 * @param {TypologicalModel} value
	 */
	public set tpattachment(value: TypologicalModel) {
		this._tpattachment = value;
	}

	/**
	 * Setter event
	 * @param {EventModel} value
	 */
	public set event(value: EventModel) {
		this._event = value;
	}

	/**
	 * Setter tpattachmentEnum
	 * @param {EnumAttachmentType} value
	 */
	public set tpattachmentEnum(value: EnumAttachmentType) {
		this._tpattachmentEnum = value;
	}
}
