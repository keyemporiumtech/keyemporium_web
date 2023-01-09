import { Pipe, PipeTransform } from '@angular/core';
import { getCurrencySymbol } from '@angular/common';
import { ApplicationStorageService } from '../../storage/services/application-storage.service';

@Pipe({ name: 'showcurrency', pure: false })
export class ShowCurrencyPipe implements PipeTransform {
	constructor(private applicationStorage: ApplicationStorageService) {}

	transform(value: string | number, symbol?: string, cod?: string): string {
		if (!symbol && !cod) {
			cod = this.applicationStorage.currency.get();
		}
		if (!symbol && cod) {
			symbol = getCurrencySymbol(cod, 'wide');
		}
		if (!value) {
			return '0.00 ' + symbol;
		}
		let num;
		if (typeof value === 'string') {
			num = parseFloat(value);
		} else {
			num = value;
		}
		return num.toFixed(2) + ' ' + symbol;
	}
}
