import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ContactreferenceModel } from '../../authentication/models/contactreference.model';
import { ProfessionModel } from './profession.model';

export class ProfessionreferenceModel extends ApiModel {
	private _cod: string;
	private _profession: ProfessionModel;
	private _contactreference: ContactreferenceModel;

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
	 * Getter contactreference
	 * @return {ContactreferenceModel}
	 */
	public get contactreference(): ContactreferenceModel {
		return this._contactreference;
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
	 * Setter contactreference
	 * @param {ContactreferenceModel} value
	 */
	public set contactreference(value: ContactreferenceModel) {
		this._contactreference = value;
	}
}
