import { ApiModel } from '../../api/cakeutils/base/api.model';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { ProfessionModel } from './profession.model';

export class ProfessionattachmentModel extends ApiModel {
	private _cod: string;
	private _profession: ProfessionModel;
	private _attachment: AttachmentModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter profession
	 * @return {ProfessionModel}
	 */
	public get profession(): ProfessionModel {
		return this._profession;
	}

	/**
	 * Getter attachment
	 * @return {AttachmentModel}
	 */
	public get attachment(): AttachmentModel {
		return this._attachment;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter profession
	 * @param {ProfessionModel} value
	 */
	public set profession(value: ProfessionModel) {
		this._profession = value;
	}

	/**
	 * Setter attachment
	 * @param {AttachmentModel} value
	 */
	public set attachment(value: AttachmentModel) {
		this._attachment = value;
	}
}
