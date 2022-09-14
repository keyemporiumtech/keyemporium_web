import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sexhtml', pure: false })
export class SexHtmlPipe implements PipeTransform {
	constructor() {}

	transform(value: any, args: any[] = []): string {
		if (!value) {
			return '';
		}
		let icon = '';
		switch (value) {
			case 'M':
			case 'm':
				icon = 'sex_m.png';
				break;
			case 'F':
			case 'f':
				icon = 'sex_f.png';
				break;
			case 'O':
			case 'o':
				icon = 'sex_o.png';
				break;
			default:
				return '';
		}
		return '<img src="assets/project/images/icons/' + icon + '" class="img-fluid icon-sex" />';
	}
}
