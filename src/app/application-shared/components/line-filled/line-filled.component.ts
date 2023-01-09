import { Component } from '@angular/core';
import { BaseComponent, ApplicationLoggerService } from '@ddc/kit';

@Component({
	selector: 'shared-line-filled',
	templateUrl: './line-filled.component.html',
	styleUrls: ['./line-filled.component.scss'],
})
export class LineFilledComponent extends BaseComponent {
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'LineFilledComponent';
	}
}
