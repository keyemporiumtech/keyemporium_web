import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent, ApplicationLoggerService, StringTranslate } from '@ddc/kit';
import { AccordionContainerComponent } from '../accordion-container/accordion-container.component';

@Component({
	selector: 'ddc-init-accordion',
	templateUrl: './accordion.component.html',
	styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent extends BaseComponent {
	@Input() parent: AccordionContainerComponent;
	@Input() label: string | StringTranslate;
	@Input() cssHeading: any;
	@Input() cssButton: any;
	@Input() cssAccordion: any;
	@Input() cssContent: any;
	@Input() styleHeading: any;
	@Input() styleButton: any;
	@Input() styleAccordion: any;
	@Input() styleContent: any;
	@Output() clickEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

	ready: boolean;
	@Input() open: boolean;
	// ids
	headingId: string = '';
	accordionId: string = '';

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {
		this.makeIds();
		this.ready = true;
	}
	ngAfterViewInitForChildren() {
		setTimeout(() => {
			this.disposeEvents();
		}, 200);
	}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'AccordionComponent';
	}

	onClick() {
		// this.open = !this.open;
		this.clickEmit.emit(this.open);
	}

	private makeIds() {
		this.headingId = 'heading' + this.id;
		this.accordionId = 'accordion' + this.id;
	}

	disposeEvents() {
		window['$']('#' + this.accordionId).on('hide.bs.collapse', this.closeAccordion);
		window['$']('#' + this.accordionId).on('show.bs.collapse', this.openAccordion);
	}

	closeAccordion = () => {
		this.open = false;
		// console.error('Ho chiuso ' + this.accordionId, this.open);
	};
	openAccordion = () => {
		this.open = true;
		// console.error('Ho aperto ' + this.accordionId, this.open);
	};
}
