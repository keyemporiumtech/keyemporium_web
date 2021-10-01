import { ApiModel } from '../../api/cakeutils/base/api.model';
import { UserModel } from '../../authentication/models/user.model';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { AddressModel } from '../../localesystem/models/address.model';
import { ContactreferenceModel } from '../../authentication/models/contactreference.model';

export class WorkuserModel extends ApiModel {
	private _cod: string;
	private _user: UserModel;
	private _image: AttachmentModel;
	private _home: AddressModel;
	private _email: ContactreferenceModel;
	private _phone: ContactreferenceModel;
	private _website: ContactreferenceModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter user
	 * @return {UserModel}
	 */
	public get user(): UserModel {
		return this._user;
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
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter user
	 * @param {UserModel} value
	 */
	public set user(value: UserModel) {
		this._user = value;
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
}
