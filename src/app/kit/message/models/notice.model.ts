import { Observable } from 'rxjs';

export class NoticeModel {
	private _id: string;
	private _notice: Observable<any>;

	constructor(id: string, notice?: Observable<any>) {
		this.id = id;
		this.notice = notice;
	}

	/**
	 * Getter notice
	 * @return {Observable<any>}
	 */
	public get notice(): Observable<any> {
		return this._notice;
	}

	/**
	 * Setter notice
	 * @param {Observable<any>} value
	 */
	public set notice(value: Observable<any>) {
		this._notice = value;
	}

	/**
	 * Getter id
	 * @return {string}
	 */
	public get id(): string {
		return this._id;
	}

	/**
	 * Setter id
	 * @param {string} value
	 */
	public set id(value: string) {
		this._id = value;
	}
}
