import { Component, Input } from '@angular/core';
import { BaseComponent, ApplicationLoggerService } from '@ddc/kit';

@Component({
	selector: 'ddc-init-accordion-container',
	templateUrl: './accordion-container.component.html',
	styleUrls: ['./accordion-container.component.scss'],
})
export class AccordionContainerComponent extends BaseComponent {
	@Input() cssContainer: any;
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'AccordionContainerComponent';
	}
}
