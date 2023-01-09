import { Component, Input } from '@angular/core';
import { StringTranslate, BaseComponent, ApplicationLoggerService } from '@ddc/kit';

@Component({
	selector: 'shared-page-container',
	templateUrl: './page-container.component.html',
	styleUrls: ['./page-container.component.scss'],
})
export class PageContainerComponent extends BaseComponent {
	@Input() title: string | StringTranslate;
	@Input() imgSrc: string;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'PageContainerComponent';
	}
}
