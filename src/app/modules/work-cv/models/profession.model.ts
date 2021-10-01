import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ContactreferenceModel } from '../../authentication/models/contactreference.model';
import { UserModel } from '../../authentication/models/user.model';
import { AddressModel } from '../../localesystem/models/address.model';
import { AttachmentModel } from '../../resources/models/attachment.model';

export class ProfessionModel extends ApiModel {
	private _cod: string;
	private _name: string;
	private _description: string;
	private _user: UserModel;
	private _address: AddressModel;
	private _email: ContactreferenceModel;
	private _phone: ContactreferenceModel;
	private _image: AttachmentModel;

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
	 * Getter description
	 * @return {string}
	 */
	public get description(): string {
		return this._description;
	}

	/**
	 * Getter user
	 * @return {UserModel}
	 */
	public get user(): UserModel {
		return this._user;
	}

	/**
	 * Getter address
	 * @return {AddressModel}
	 */
	public get address(): AddressModel {
		return this._address;
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
	 * Getter image
	 * @return {AttachmentModel}
	 */
	public get image(): AttachmentModel {
		return this._image;
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
	 * Setter description
	 * @param {string} value
	 */
	public set description(value: string) {
		this._description = value;
	}

	/**
	 * Setter user
	 * @param {UserModel} value
	 */
	public set user(value: UserModel) {
		this._user = value;
	}

	/**
	 * Setter address
	 * @param {AddressModel} value
	 */
	public set address(value: AddressModel) {
		this._address = value;
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
	 * Setter image
	 * @param {AttachmentModel} value
	 */
	public set image(value: AttachmentModel) {
		this._image = value;
	}
}
