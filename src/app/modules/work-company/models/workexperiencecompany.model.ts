import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ActivityModel } from '../../authentication/models/activity.model';
import { WorkexperienceModel } from './workexperience.model';

export class WorkexperiencecompanyModel extends ApiModel {
	private _cod: string;
	private _company: ActivityModel;
	private _experience: WorkexperienceModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter company
	 * @return {ActivityModel}
	 */
	public get company(): ActivityModel {
		return this._company;
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
	 * Setter company
	 * @param {ActivityModel} value
	 */
	public set company(value: ActivityModel) {
		this._company = value;
	}

	/**
	 * Setter experience
	 * @param {WorkexperienceModel} value
	 */
	public set experience(value: WorkexperienceModel) {
		this._experience = value;
	}
}
