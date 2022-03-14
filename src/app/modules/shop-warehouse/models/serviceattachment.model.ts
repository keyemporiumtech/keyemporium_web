import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ServiceModel } from './service.model';
import { AttachmentModel } from '../../resources/models/attachment.model';

export class ServiceattachmentModel extends ApiModel {
	private _cod: string;
	private _service: ServiceModel;
	private _attachment: AttachmentModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter service
	 * @return {ServiceModel}
	 */
	public get service(): ServiceModel {
		return this._service;
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
	 * Setter service
	 * @param {ServiceModel} value
	 */
	public set service(value: ServiceModel) {
		this._service = value;
	}

	/**
	 * Setter attachment
	 * @param {AttachmentModel} value
	 */
	public set attachment(value: AttachmentModel) {
		this._attachment = value;
	}
}
