import { ApiModel } from '../../api/cakeutils/base/api.model';
import { UserModel } from './user.model';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { EnumAttachmentType } from '../../resources/enums/attachment-type.enum';

export class UserattachmentModel extends ApiModel {
	private _cod: string;
	private _flgprincipal: number; // boolean
	private _user: UserModel;
	private _attachment: AttachmentModel;
	private _tpattachment: TypologicalModel;
	private _group: string;

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
	 * @return {number}
	 */
	public get flgprincipal(): number {
		return this._flgprincipal;
	}

	/**
	 * Getter user
	 * @return {UserModel}
	 */
	public get user(): UserModel {
		return this._user;
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
	 * Getter group
	 * @return {string}
	 */
	public get group(): string {
		return this._group;
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
	 * @param {number} value
	 */
	public set flgprincipal(value: number) {
		this._flgprincipal = value;
	}

	/**
	 * Setter user
	 * @param {UserModel} value
	 */
	public set user(value: UserModel) {
		this._user = value;
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
	 * Setter group
	 * @param {string} value
	 */
	public set group(value: string) {
		this._group = value;
	}

	/**
	 * Setter tpattachmentEnum
	 * @param {EnumAttachmentType} value
	 */
	public set tpattachmentEnum(value: EnumAttachmentType) {
		this._tpattachmentEnum = value;
	}
}
