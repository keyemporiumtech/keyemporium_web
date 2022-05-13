import * as momentNs from 'moment';
import { DateModel } from '../models/date.model';
import * as _moment from 'moment-timezone';
import { DurationInterface } from '../interfaces/duration.interface';
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

	static isBisestile(year: number) {
		if (year > 1584 && (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0))) {
			return true;
		} else {
			return false;
		}
	}
	static getMaxDayByMonth(month: number, year?: number) {
		switch (month) {
			case 4:
			case 6:
			case 9:
			case 11:
				return 30;
			case 2:
				return !year ? 28 : this.isBisestile(year) ? 29 : 28;
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				return 31;
			default:
				return undefined;
		}
	}

	// operations - add
	static add(
		date: any | Date | string | number | DateModel,
		duration: DurationInterface,
		format?: string,
	) {
		const dta = new DateModel(date, format);
		return new DateModel(dta.date.clone().add(duration), format);
	}
	static addYears(date: any | Date | string | number | DateModel, years: number, format?: string) {
		return this.add(date, { years: years }, format);
	}
	static addMonths(
		date: any | Date | string | number | DateModel,
		months: number,
		format?: string,
	) {
		return this.add(date, { months: months }, format);
	}
	static addWeeks(date: any | Date | string | number | DateModel, weeks: number, format?: string) {
		return this.add(date, { weeks: weeks }, format);
	}
	static addDays(date: any | Date | string | number | DateModel, days: number, format?: string) {
		return this.add(date, { days: days }, format);
	}
	static addHours(date: any | Date | string | number | DateModel, hours: number, format?: string) {
		return this.add(date, { hours: hours }, format);
	}
	static addMinutes(
		date: any | Date | string | number | DateModel,
		minutes: number,
		format?: string,
	) {
		return this.add(date, { minutes: minutes }, format);
	}
	static addSeconds(
		date: any | Date | string | number | DateModel,
		seconds: number,
		format?: string,
	) {
		return this.add(date, { seconds: seconds }, format);
	}
	static addMilliseconds(
		date: any | Date | string | number | DateModel,
		milliseconds: number,
		format?: string,
	) {
		return this.add(date, { milliseconds: milliseconds }, format);
	}
	// operations - subtract
	static subtract(
		date: any | Date | string | number | DateModel,
		duration: DurationInterface,
		format?: string,
	) {
		const dta = new DateModel(date, format);
		return new DateModel(dta.date.clone().subtract(duration), format);
	}
	static subtractYears(
		date: any | Date | string | number | DateModel,
		years: number,
		format?: string,
	) {
		return this.subtract(date, { years: years }, format);
	}
	static subtractMonths(
		date: any | Date | string | number | DateModel,
		months: number,
		format?: string,
	) {
		return this.subtract(date, { months: months }, format);
	}
	static subtractWeeks(
		date: any | Date | string | number | DateModel,
		weeks: number,
		format?: string,
	) {
		return this.subtract(date, { weeks: weeks }, format);
	}
	static subtractDays(
		date: any | Date | string | number | DateModel,
		days: number,
		format?: string,
	) {
		return this.subtract(date, { days: days }, format);
	}
	static subtractHours(
		date: any | Date | string | number | DateModel,
		hours: number,
		format?: string,
	) {
		return this.subtract(date, { hours: hours }, format);
	}
	static subtractMinutes(
		date: any | Date | string | number | DateModel,
		minutes: number,
		format?: string,
	) {
		return this.subtract(date, { minutes: minutes }, format);
	}
	static subtractSeconds(
		date: any | Date | string | number | DateModel,
		seconds: number,
		format?: string,
	) {
		return this.subtract(date, { seconds: seconds }, format);
	}
	static subtractMilliseconds(
		date: any | Date | string | number | DateModel,
		milliseconds: number,
		format?: string,
	) {
		return this.subtract(date, { milliseconds: milliseconds }, format);
	}
}
