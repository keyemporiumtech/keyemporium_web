import * as momentNs from 'moment';
import { DateModel } from '../models/date.model';
import * as _moment from 'moment-timezone';
const moment = _moment;
export class DateUtility {
	static TODAY(): DateModel {
		return new DateModel(moment().startOf('day'));
	}
	static TODAY_HH(): DateModel {
		return new DateModel(moment().startOf('minute'));
	}

	static printDateByString(dta: momentNs.Moment | Date | string | number, format?: string) {
		const data = new DateModel(dta);
		return data.toString(format);
	}

	static getYearsByDays(days: number): number {
		if (days && days > 360) {
			return Math.round(days / 360);
		}
		return 0;
	}

	static getRemainingDaysByRoundYears(days: number, years: number): number {
		if (years && years > 0) {
			return days - years * 360;
		}
		return days;
	}

	static getMonthsByDays(days: number): number {
		if (days && days > 30) {
			return Math.round(days / 30);
		}
		return 0;
	}

	static getRemainingDaysByRoundMonths(days: number, months: number): number {
		if (months && months > 0) {
			return days - months * 30;
		}
		return days;
	}

	static getCompleteDurationByDays(days: number): any {
		let years = 0;
		let months = 0;
		let daysRemain = days;
		if (days > 360) {
			years = this.getYearsByDays(days);
			days = this.getRemainingDaysByRoundYears(days, years);
		}
		if (days > 30) {
			months = this.getMonthsByDays(days);
			daysRemain = this.getRemainingDaysByRoundMonths(days, months);
		}
		return { years: years, months: months, days: daysRemain };
	}

	static toHHMMSS = (secs) => {
		const sec_num = parseInt(secs, 10);
		const hours = Math.floor(sec_num / 3600);
		const minutes = Math.floor(sec_num / 60) % 60;
		const seconds = sec_num % 60;

		return [hours, minutes, seconds]
			.map((v) => (v < 10 ? '0' + v : v))
			.filter((v, i) => v !== '00' || i > 0)
			.join(':');
	};

	static toMMSS = (secs) => {
		const sec_num = parseInt(secs, 10);
		const minutes = Math.floor(sec_num / 60) % 60;
		const seconds = sec_num % 60;

		return [minutes, seconds]
			.map((v) => (v < 10 ? '0' + v : v))
			.filter((v, i) => v !== '00' || i > 0)
			.join(':');
	};
}
