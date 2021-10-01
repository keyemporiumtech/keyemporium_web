import { Component, Output, Input, EventEmitter } from '@angular/core';
import { BaseComponent, ApplicationLoggerService, StringTranslate } from '@ddc/kit';
declare var $: any;

@Component({
	selector: 'ddc-init-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
})
export class ModalComponent extends BaseComponent {
	@Output() ok: EventEmitter<any> = new EventEmitter<any>();
	@Output() close: EventEmitter<any> = new EventEmitter<any>();
	@Input() classModal: any;
	@Input() classAnimation: string;
	@Input() classDialog: any;
	@Input() classDimension: string;
	@Input() classContent: any;
	@Input() classHeader: any;
	@Input() classTitle: any;
	@Input() title: string | StringTranslate = '';
	@Input() classBody: any;
	@Input() classText: any;
	@Input() text: string | StringTranslate = undefined;
	@Input() classFooter: any;
	@Input() flagButtonClose: boolean = true;
	@Input() classButtonClose: any;
	@Input() textButtonClose: string | StringTranslate = undefined;
	@Input() flagButtonOk: boolean = true;
	@Input() classButtonOk: any;
	@Input() textButtonOk: string | StringTranslate = undefined;
	@Input() scrollable: boolean = false;
	scrollableClass: string = '';
	@Input() centered: boolean = false;
	centeredClass: string = '';

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {
		if (this.flagButtonClose) {
			this.classButtonClose = this.classButtonClose ? this.classButtonClose : 'btn btn-secondary';
			this.textButtonClose = this.textButtonClose ? this.textButtonClose : 'close';
		}
		if (this.flagButtonOk) {
			this.classButtonOk = this.classButtonOk ? this.classButtonOk : 'btn btn-primary';
			this.textButtonOk = this.textButtonOk ? this.textButtonOk : 'Ok';
		}
		if (this.scrollable && !this.centered) {
			this.scrollableClass = 'modal-dialog-scrollable';
		}
		if (this.centered && !this.scrollable) {
			this.centeredClass = 'modal-dialog-centered';
		}
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'ModalComponent';
	}

	// function
	onClickOk($event: any) {
		this.ok.emit($event);
	}
	onClickClose($event: any) {
		this.close.emit($event);
	}
	openModal() {
		$('#' + this.id).modal('show');
	}
	closeModal() {
		$('#' + this.id).modal('hide');
	}
}
