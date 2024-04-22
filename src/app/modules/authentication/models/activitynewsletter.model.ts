import { ApiModel } from '../../api/cakeutils/base/api.model';
import { ActivityModel } from './activity.model';
import { NewsletterModel } from './newsletter.model';

export class ActivitynewsletterModel extends ApiModel {
	private _cod: string;
	private _title: string;
	private _activity: ActivityModel;
	private _newsletter: NewsletterModel;

	/**
	 * Getter cod
	 * @return {string}
	 */
	public get cod(): string {
		return this._cod;
	}

	/**
	 * Getter title
	 * @return {string}
	 */
	public get title(): string {
		return this._title;
	}

	/**
	 * Getter activity
	 * @return {ActivityModel}
	 */
	public get activity(): ActivityModel {
		return this._activity;
	}

	/**
	 * Getter newsletter
	 * @return {NewsletterModel}
	 */
	public get newsletter(): NewsletterModel {
		return this._newsletter;
	}

	/**
	 * Setter cod
	 * @param {string} value
	 */
	public set cod(value: string) {
		this._cod = value;
	}

	/**
	 * Setter title
	 * @param {string} value
	 */
	public set title(value: string) {
		this._title = value;
	}

	/**
	 * Setter activity
	 * @param {ActivityModel} value
	 */
	public set activity(value: ActivityModel) {
		this._activity = value;
	}

	/**
	 * Setter newsletter
	 * @param {NewsletterModel} value
	 */
	public set newsletter(value: NewsletterModel) {
		this._newsletter = value;
	}
}
