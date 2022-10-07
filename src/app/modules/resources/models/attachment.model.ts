import { FileEmbedModel, SizeFormat } from '@ddc/kit';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { ApiModel } from '../../api/cakeutils/base/api.model';
import { EnumAttachmentType } from '../enums/attachment-type.enum';

export class AttachmentModel extends ApiModel {
	private _url: string;
	private _path: string;
	private _name: string;
	private _cid: string;
	private _cod: string;
	private _description: string;
	private _size: number;
	private _ext: string;
	private _mimetype: string;
	private _type: string;
	private _flgpre: boolean;
	private _flgpost: boolean;
	private _prehtml: string;
	private _posthtml: string;
	private _tpattachment: TypologicalModel;
	private _content: string;
	// enums
	private _tpattachmentEnum: EnumAttachmentType;
	// others
	private _sizeFormat: SizeFormat;
	private _fileEmbed: FileEmbedModel;

	get sizeString(): string {
		if (this.sizeFormat) {
			return this.sizeFormat.sizeString;
		}
		return '';
	}
	get sizeStringFixed(): string {
		if (this.sizeFormat) {
			return Number(this.sizeFormat.size).toFixed(2) + ' ' + this.sizeFormat.unit;
		}
		return '';
	}

	get src(): string {
		if (this.mimetype && this.content) {
			return 'data:' + this.mimetype + ';base64,' + this.content;
		}
		return undefined;
	}

	/**
	 * Getter url
	 * @return {string}
	 */
	public get url(): string {
		return this._url;
	}

	/**
	 * Getter path
	 * @return {string}
	 */
	public get path(): string {
		return this._path;
	}

	/**
	 * Getter name
	 * @return {string}
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Getter cid
	 * @return {string}
	 */
	public get cid(): string {
		return this._cid;
	}

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter description
	 * @return {string}
	 */
	public get description(): string {
		return this._description;
	}

	/**
	 * Getter size
	 * @return {number}
	 */
	public get size(): number {
		return this._size;
	}

	/**
	 * Getter ext
	 * @return {string}
	 */
	public get ext(): string {
		return this._ext;
	}

	/**
	 * Getter mimetype
	 * @return {string}
	 */
	public get mimetype(): string {
		return this._mimetype;
	}

	/**
	 * Getter type
	 * @return {string}
	 */
	public get type(): string {
		return this._type;
	}

	/**
	 * Getter flgpre
	 * @return {boolean}
	 */
	public get flgpre(): boolean {
		return this._flgpre;
	}

	/**
	 * Getter flgpost
	 * @return {boolean}
	 */
	public get flgpost(): boolean {
		return this._flgpost;
	}

	/**
	 * Getter prehtml
	 * @return {string}
	 */
	public get prehtml(): string {
		return this._prehtml;
	}

	/**
	 * Getter posthtml
	 * @return {string}
	 */
	public get posthtml(): string {
		return this._posthtml;
	}

	/**
	 * Getter tpattachment
	 * @return {TypologicalModel}
	 */
	public get tpattachment(): TypologicalModel {
		return this._tpattachment;
	}

	/**
	 * Getter content
	 * @return {string}
	 */
	public get content(): string {
		return this._content;
	}

	/**
	 * Setter url
	 * @param {string} value
	 */
	public set url(value: string) {
		this._url = value;
	}

	/**
	 * Setter path
	 * @param {string} value
	 */
	public set path(value: string) {
		this._path = value;
	}

	/**
	 * Setter name
	 * @param {string} value
	 */
	public set name(value: string) {
		this._name = value;
	}

	/**
	 * Setter cid
	 * @param {string} value
	 */
	public set cid(value: string) {
		this._cid = value;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter description
	 * @param {string} value
	 */
	public set description(value: string) {
		this._description = value;
	}

	/**
	 * Setter size
	 * @param {number} value
	 */
	public set size(value: number) {
		this._size = value;
	}

	/**
	 * Setter ext
	 * @param {string} value
	 */
	public set ext(value: string) {
		this._ext = value;
	}

	/**
	 * Setter mimetype
	 * @param {string} value
	 */
	public set mimetype(value: string) {
		this._mimetype = value;
	}

	/**
	 * Setter type
	 * @param {string} value
	 */
	public set type(value: string) {
		this._type = value;
	}

	/**
	 * Setter flgpre
	 * @param {boolean} value
	 */
	public set flgpre(value: boolean) {
		this._flgpre = value;
	}

	/**
	 * Setter flgpost
	 * @param {boolean} value
	 */
	public set flgpost(value: boolean) {
		this._flgpost = value;
	}

	/**
	 * Setter prehtml
	 * @param {string} value
	 */
	public set prehtml(value: string) {
		this._prehtml = value;
	}

	/**
	 * Setter posthtml
	 * @param {string} value
	 */
	public set posthtml(value: string) {
		this._posthtml = value;
	}

	/**
	 * Setter tpattachment
	 * @param {TypologicalModel} value
	 */
	public set tpattachment(value: TypologicalModel) {
		this._tpattachment = value;
	}

	/**
	 * Setter content
	 * @param {string} value
	 */
	public set content(value: string) {
		this._content = value;
	}

	/**
	 * Getter sizeFormat
	 * @return {SizeFormat}
	 */
	public get sizeFormat(): SizeFormat {
		return this._sizeFormat;
	}

	/**
	 * Getter fileEmbed
	 * @return {FileEmbedModel}
	 */
	public get fileEmbed(): FileEmbedModel {
		return this._fileEmbed;
	}

	/**
	 * Setter sizeFormat
	 * @param {SizeFormat} value
	 */
	public set sizeFormat(value: SizeFormat) {
		this._sizeFormat = value;
	}

	/**
	 * Setter fileEmbed
	 * @param {FileEmbedModel} value
	 */
	public set fileEmbed(value: FileEmbedModel) {
		this._fileEmbed = value;
	}

	/**
	 * Getter tpattachmentEnum
	 * @return {EnumAttachmentType}
	 */
	public get tpattachmentEnum(): EnumAttachmentType {
		return this._tpattachmentEnum;
	}

	/**
	 * Setter tpattachmentEnum
	 * @param {EnumAttachmentType} value
	 */
	public set tpattachmentEnum(value: EnumAttachmentType) {
		this._tpattachmentEnum = value;
	}
}
