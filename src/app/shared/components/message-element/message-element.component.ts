import { Component } from '@angular/core';
import { BaseMessageSubjectComponent, ApplicationLoggerService, MessageService } from '@ddc/kit';
import { template } from '../../../../environments/template/template';
declare var $: any;

@Component({
	selector: 'ddc-init-message-element',
	templateUrl: './message-element.component.html',
	styleUrls: ['./message-element.component.scss'],
})
export class MessageElementComponent extends BaseMessageSubjectComponent {
	windowCloseIcon: string;
	constructor(applicationLogger: ApplicationLoggerService, messageService: MessageService) {
		super(applicationLogger, messageService);
		this.windowCloseIcon = template.icons.windowClose;
	}

	getClassName(): string {
		return 'MessageElementComponent';
	}

	ngAfterViewInitForChildren() {}

	getCSSClassInfo(): string {
		return this.typeComponent === 'MODAL' ? 'modal-info' : 'div-info';
	}
	getCSSClassWarning(): string {
		return this.typeComponent === 'MODAL' ? 'modal-warning' : 'div-warning';
	}
	getCSSClassError(): string {
		return this.typeComponent === 'MODAL' ? 'modal-error' : 'div-error';
	}
	getCSSClassException(): string {
		return this.typeComponent === 'MODAL' ? 'modal-exception' : 'div-exception';
	}

	close() {
		super.close();
		if (this.typeComponent === 'MODAL') {
			$('#' + this.idMessage).modal('hide');
		}
	}
}
