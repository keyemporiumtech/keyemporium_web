/**
 * @author Alessandro Avolio (including spelling mistakes in English).
 * All ideas here are an evolution of solutions designed by GiuDiCo's team for their project.
 */

import * as _moment from 'moment-timezone';
const moment = _moment;
export class DateModel {
	private _date: any;

	constructor(date: any | Date | string | number | DateModel, format?: string) {
		if (!date) {
			return;
		}
		if (date instanceof DateModel) {
			this._date = date.date;
		} else if (typeof date === 'number') {
			this._date = moment(date);
		} else if (date instanceof Date || moment.isMoment(date)) {
			this._date = moment(date);
		} else if (typeof date === 'string' && date.length === 10) {
			this._date = moment(date);
		} else if (typeof date === 'string' && format) {
			this._date = moment(date, format);
		} else {
			this._date = moment(date);
		}
	}

	get date(): any {
		return this._date;
	}

	set date(value: any) {
		this._date = value;
	}

	toString(format?: string, timezoneName?: string): string {
		return this._date
			? timezoneName
				? this._date
						.clone()
						.tz(timezoneName)
						.format(format ? format : 'DD/MM/YYYY')
				: this._date.format(format ? format : 'DD/MM/YYYY')
			: '';
	}

	toDate(): Date {
		return this._date ? this._date.toDate() : undefined;
	}

	toTimeStamp() {
		return this._date ? this._date.format('x') : undefined;
	}

	toUTC() {
		return this._date ? this._date.utc().clone().format() : undefined;
	}
	toDTO() {
		return this._date ? +this._date.clone().utc().format('x') : undefined;
	}
	toJSON() {
		return this.toDTO();
	}
}
