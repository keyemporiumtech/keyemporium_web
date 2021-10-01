import { BaseModel } from '@ddc/kit';
import { OpenstreetExtratagImageModel } from './openstreet-extratag-image.model';

export class OpenstreetExtratagModel extends BaseModel {
	private _key: string;
	private _value: string;
	private _description: string;
	private _image: OpenstreetExtratagImageModel;

	/**
	 * Getter key
	 * @return {string}
	 */
	public get key(): string {
		return this._key;
	}

	/**
	 * Getter value
	 * @return {string}
	 */
	public get value(): string {
		return this._value;
	}

	/**
	 * Getter description
	 * @return {string}
	 */
	public get description(): string {
		return this._description;
	}

	/**
	 * Getter image
	 * @return {OpenstreetExtratagImageModel}
	 */
	public get image(): OpenstreetExtratagImageModel {
		return this._image;
	}

	/**
	 * Setter key
	 * @param {string} value
	 */
	public set key(value: string) {
		this._key = value;
	}

	/**
	 * Setter value
	 * @param {string} value
	 */
	public set value(value: string) {
		this._value = value;
	}

	/**
	 * Setter description
	 * @param {string} value
	 */
	public set description(value: string) {
		this._description = value;
	}

	/**
	 * Setter image
	 * @param {OpenstreetExtratagImageModel} value
	 */
	public set image(value: OpenstreetExtratagImageModel) {
		this._image = value;
	}
}
