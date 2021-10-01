import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ContactreferenceModel } from '../../authentication/models/contactreference.model';
import { AddressModel } from '../../localesystem/models/address.model';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { ProfessionModel } from '../../work-cv/models/profession.model';

export class PicModel extends ApiModel {
	private _id_user: string;
	private _cf: string;
	private _image: AttachmentModel;
	private _home: AddressModel;
	private _email: ContactreferenceModel;
	private _phone: ContactreferenceModel;
	private _website: ContactreferenceModel;
	private _professions: ProfessionModel[];

	/**
	 * Getter id_user
	 * @return {string}
	 */
	public get id_user(): string {
		return this._id_user;
	}

	/**
	 * Getter cf
	 * @return {string}
	 */
	public get cf(): string {
		return this._cf;
	}

	/**
	 * Getter image
	 * @return {AttachmentModel}
	 */
	public get image(): AttachmentModel {
		return this._image;
	}

	/**
	 * Getter home
	 * @return {AddressModel}
	 */
	public get home(): AddressModel {
		return this._home;
	}

	/**
	 * Getter email
	 * @return {ContactreferenceModel}
	 */
	public get email(): ContactreferenceModel {
		return this._email;
	}

	/**
	 * Getter phone
	 * @return {ContactreferenceModel}
	 */
	public get phone(): ContactreferenceModel {
		return this._phone;
	}

	/**
	 * Getter website
	 * @return {ContactreferenceModel}
	 */
	public get website(): ContactreferenceModel {
		return this._website;
	}

	/**
	 * Getter professions
	 * @return {ProfessionModel[]}
	 */
	public get professions(): ProfessionModel[] {
		return this._professions;
	}

	/**
	 * Setter id_user
	 * @param {string} value
	 */
	public set id_user(value: string) {
		this._id_user = value;
	}

	/**
	 * Setter cf
	 * @param {string} value
	 */
	public set cf(value: string) {
		this._cf = value;
	}

	/**
	 * Setter image
	 * @param {AttachmentModel} value
	 */
	public set image(value: AttachmentModel) {
		this._image = value;
	}

	/**
	 * Setter home
	 * @param {AddressModel} value
	 */
	public set home(value: AddressModel) {
		this._home = value;
	}

	/**
	 * Setter email
	 * @param {ContactreferenceModel} value
	 */
	public set email(value: ContactreferenceModel) {
		this._email = value;
	}

	/**
	 * Setter phone
	 * @param {ContactreferenceModel} value
	 */
	public set phone(value: ContactreferenceModel) {
		this._phone = value;
	}

	/**
	 * Setter website
	 * @param {ContactreferenceModel} value
	 */
	public set website(value: ContactreferenceModel) {
		this._website = value;
	}

	/**
	 * Setter professions
	 * @param {ProfessionModel[]} value
	 */
	public set professions(value: ProfessionModel[]) {
		this._professions = value;
	}
}
