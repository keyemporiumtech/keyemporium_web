import { Component, Input } from '@angular/core';
import { BaseComponent, ApplicationLoggerService, StringTranslate } from '@ddc/kit';

@Component({
	selector: 'shared-sub-title',
	templateUrl: './sub-title.component.html',
	styleUrls: ['./sub-title.component.scss'],
})
export class SubTitleComponent extends BaseComponent {
	@Input() title: string | StringTranslate;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'SubTitleComponent';
	}
}
