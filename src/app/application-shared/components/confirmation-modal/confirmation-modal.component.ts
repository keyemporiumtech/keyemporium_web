import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { BaseComponent, ApplicationLoggerService, StringTranslate } from '@ddc/kit';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
	selector: 'shared-confirmation-modal',
	templateUrl: './confirmation-modal.component.html',
	styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent extends BaseComponent {
	@ViewChild('modalConfirm') modalConfirm: ModalComponent;
	@Output() confirm: EventEmitter<boolean> = new EventEmitter<boolean>();
	// modal properties
	@Input() text: string | StringTranslate;
	title: string = 'PERSONAL.LABEL.INFO';
	textButtonClose: string = 'PERSONAL.BUTTON.CLOSE';
	textButtonOk: string = 'APP.BUTTON.CONFIRM';
	classHeader = 'bg-warning';
	classBody = 'bg-white';
	classFooter = 'bg-light';

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'ConfirmationModalComponent';
	}

	// operations
	open() {
		if (this.modalConfirm) {
			this.modalConfirm.openModal();
		}
	}
	close() {
		if (this.modalConfirm) {
			this.modalConfirm.closeModal();
		}
	}
	onConfirm() {
		this.confirm.emit(true);
	}
}
