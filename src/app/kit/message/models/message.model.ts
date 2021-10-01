import { EnumMessageType } from '../enums/message-type.enum';
import { StringTranslate } from '../../translation/models/string-translate.model';

export class MessageModel {
	private _type: EnumMessageType;
	private _code: number;
	private _title: string | StringTranslate;
	private _text: string | StringTranslate;
	private _exception: string | StringTranslate;

	constructor(
		type: EnumMessageType,
		code: number,
		title: string | StringTranslate,
		text: string | StringTranslate,
		exception?: string | StringTranslate,
	) {
		this.type = type;
		this.code = code;
		this.title = title;
		this.text = text;
		this.exception = exception;
	}

	/**
	 * Getter type
	 * @return EnumMessageType
	 */
	public get type(): EnumMessageType {
		return this._type;
	}

	/**
	 * Getter code
	 * @return number
	 */
	public get code(): number {
		return this._code;
	}

	/**
	 * Getter title
	 * @return string
	 */
	public get title(): string | StringTranslate {
		return this._title;
	}

	/**
	 * Getter text
	 * @return string
	 */
	public get text(): string | StringTranslate {
		return this._text;
	}

	/**
	 * Getter exception
	 * @return string
	 */
	public get exception(): string | StringTranslate {
		return this._exception;
	}

	/**
	 * Setter type
	 * @param EnumMessageType value
	 */
	public set type(value: EnumMessageType) {
		this._type = value;
	}

	/**
	 * Setter code
	 * @param number value
	 */
	public set code(value: number) {
		this._code = value;
	}

	/**
	 * Setter title
	 * @param string value
	 */
	public set title(value: string | StringTranslate) {
		this._title = value;
	}

	/**
	 * Setter text
	 * @param string value
	 */
	public set text(value: string | StringTranslate) {
		this._text = value;
	}

	/**
	 * Setter exception
	 * @param string value
	 */
	public set exception(value: string | StringTranslate) {
		this._exception = value;
	}
}
