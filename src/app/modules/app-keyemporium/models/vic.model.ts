import { DateModel } from '@ddc/kit';
import { ApiModel } from '../../api/cakeutils/base/api.model';
import { EnumSexType } from '../../authentication/enums/sex-type.enum';
import { ContactreferenceModel } from '../../authentication/models/contactreference.model';
import { AddressModel } from '../../localesystem/models/address.model';
import { AttachmentModel } from '../../resources/models/attachment.model';

export class VicModel extends ApiModel {
	private _id_user: string;
	private _image: AttachmentModel;
	private _images: AttachmentModel[];
	private _attachments: AttachmentModel[];
	private _name: string;
	private _surname: string;
	private _sex: string;
	private _born: string;
	private _home: AddressModel;
	private _addresses: AddressModel[];
	private _email: ContactreferenceModel;
	private _emails: ContactreferenceModel[];
	private _phone: ContactreferenceModel;
	private _phones: ContactreferenceModel[];
	private _link: ContactreferenceModel;
	private _links: ContactreferenceModel[];
	// enums
	private _sexEnum: EnumSexType;

	public get bornModel(): DateModel {
		return new DateModel(this.born);
	}
	public get bornFormat(): string {
		const dateModel = new DateModel(this.born);
		return dateModel.toString();
	}

	/**
	 * Getter id_user
	 * @return {string}
	 */
	public get id_user(): string {
		return this._id_user;
	}

	/**
	 * Getter image
	 * @return {AttachmentModel}
	 */
	public get image(): AttachmentModel {
		return this._image;
	}

	/**
	 * Getter images
	 * @return {AttachmentModel[]}
	 */
	public get images(): AttachmentModel[] {
		return this._images;
	}

	/**
	 * Getter attachments
	 * @return {AttachmentModel[]}
	 */
	public get attachments(): AttachmentModel[] {
		return this._attachments;
	}

	/**
	 * Getter name
	 * @return {string}
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Getter surname
	 * @return {string}
	 */
	public get surname(): string {
		return this._surname;
	}

	/**
	 * Getter sex
	 * @return {string}
	 */
	public get sex(): string {
		return this._sex;
	}

	/**
	 * Getter born
	 * @return {string}
	 */
	public get born(): string {
		return this._born;
	}

	/**
	 * Getter home
	 * @return {AddressModel}
	 */
	public get home(): AddressModel {
		return this._home;
	}

	/**
	 * Getter addresses
	 * @return {AddressModel[]}
	 */
	public get addresses(): AddressModel[] {
		return this._addresses;
	}

	/**
	 * Getter email
	 * @return {ContactreferenceModel}
	 */
	public get email(): ContactreferenceModel {
		return this._email;
	}

	/**
	 * Getter emails
	 * @return {ContactreferenceModel[]}
	 */
	public get emails(): ContactreferenceModel[] {
		return this._emails;
	}

	/**
	 * Getter phone
	 * @return {ContactreferenceModel}
	 */
	public get phone(): ContactreferenceModel {
		return this._phone;
	}

	/**
	 * Getter phones
	 * @return {ContactreferenceModel[]}
	 */
	public get phones(): ContactreferenceModel[] {
		return this._phones;
	}

	/**
	 * Getter link
	 * @return {ContactreferenceModel}
	 */
	public get link(): ContactreferenceModel {
		return this._link;
	}

	/**
	 * Getter links
	 * @return {ContactreferenceModel[]}
	 */
	public get links(): ContactreferenceModel[] {
		return this._links;
	}

	/**
	 * Setter id_user
	 * @param {string} value
	 */
	public set id_user(value: string) {
		this._id_user = value;
	}

	/**
	 * Setter image
	 * @param {AttachmentModel} value
	 */
	public set image(value: AttachmentModel) {
		this._image = value;
	}

	/**
	 * Setter images
	 * @param {AttachmentModel[]} value
	 */
	public set images(value: AttachmentModel[]) {
		this._images = value;
	}

	/**
	 * Setter attachments
	 * @param {AttachmentModel[]} value
	 */
	public set attachments(value: AttachmentModel[]) {
		this._attachments = value;
	}

	/**
	 * Setter name
	 * @param {string} value
	 */
	public set name(value: string) {
		this._name = value;
	}

	/**
	 * Setter surname
	 * @param {string} value
	 */
	public set surname(value: string) {
		this._surname = value;
	}

	/**
	 * Setter sex
	 * @param {string} value
	 */
	public set sex(value: string) {
		this._sex = value;
	}

	/**
	 * Setter born
	 * @param {string} value
	 */
	public set born(value: string) {
		this._born = value;
	}

	/**
	 * Setter home
	 * @param {AddressModel} value
	 */
	public set home(value: AddressModel) {
		this._home = value;
	}

	/**
	 * Setter addresses
	 * @param {AddressModel[]} value
	 */
	public set addresses(value: AddressModel[]) {
		this._addresses = value;
	}

	/**
	 * Setter email
	 * @param {ContactreferenceModel} value
	 */
	public set email(value: ContactreferenceModel) {
		this._email = value;
	}

	/**
	 * Setter emails
	 * @param {ContactreferenceModel[]} value
	 */
	public set emails(value: ContactreferenceModel[]) {
		this._emails = value;
	}

	/**
	 * Setter phone
	 * @param {ContactreferenceModel} value
	 */
	public set phone(value: ContactreferenceModel) {
		this._phone = value;
	}

	/**
	 * Setter phones
	 * @param {ContactreferenceModel[]} value
	 */
	public set phones(value: ContactreferenceModel[]) {
		this._phones = value;
	}

	/**
	 * Setter link
	 * @param {ContactreferenceModel} value
	 */
	public set link(value: ContactreferenceModel) {
		this._link = value;
	}

	/**
	 * Setter links
	 * @param {ContactreferenceModel[]} value
	 */
	public set links(value: ContactreferenceModel[]) {
		this._links = value;
	}

	/**
	 * Getter sexEnum
	 * @return {EnumSexType}
	 */
	public get sexEnum(): EnumSexType {
		return this._sexEnum;
	}

	/**
	 * Setter sexEnum
	 * @param {EnumSexType} value
	 */
	public set sexEnum(value: EnumSexType) {
		this._sexEnum = value;
	}
}
