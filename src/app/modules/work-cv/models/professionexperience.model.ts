import { ApiModel } from '../../api/cakeutils/base/api.model';
import { WorkexperienceModel } from '../../work-company/models/workexperience.model';
import { ProfessionModel } from './profession.model';

export class ProfessionexperienceModel extends ApiModel {
	private _cod: string;
	private _profession: ProfessionModel;
	private _experience: WorkexperienceModel;

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
	 * Getter experience
	 * @return {WorkexperienceModel}
	 */
	public get experience(): WorkexperienceModel {
		return this._experience;
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
	 * Setter experience
	 * @param {WorkexperienceModel} value
	 */
	public set experience(value: WorkexperienceModel) {
		this._experience = value;
	}
}
