import { Pipe, PipeTransform } from '@angular/core';
import { DateModel } from '../models/date.model';

@Pipe({ name: 'datemodel', pure: false })
export class DateModelPipe implements PipeTransform {
	constructor() {}

	transform(value: string, format: string = 'DD/MM/YYYY'): string {
		if (!value) {
			return '';
		}
		const dta: DateModel = new DateModel(value);
		return dta.toString(format);
	}
}
