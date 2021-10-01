import { Component } from '@angular/core';
import {
	BaseMessageRoutingComponent,
	ApplicationLoggerService,
	MessageService,
	PreviousRouteService,
	ApplicationStorageService,
} from '@ddc/kit';

@Component({
	selector: 'ddc-init-message-page',
	templateUrl: './message-page.component.html',
	styleUrls: ['./message-page.component.scss'],
})
export class MessagePageComponent extends BaseMessageRoutingComponent {
	constructor(
		applicationLogger: ApplicationLoggerService,
		messageService: MessageService,
		previousRoute: PreviousRouteService,
		applicationStorage: ApplicationStorageService,
	) {
		super(applicationLogger, messageService, previousRoute, applicationStorage);
	}
	getClassName(): string {
		return 'MessagePageComponent';
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}

	getCSSClassInfo(): string {
		return 'bg-success text-white';
	}
	getCSSClassWarning(): string {
		return 'bg-warning text-white';
	}
	getCSSClassError(): string {
		return 'bg-danger text-white';
	}
	getCSSClassException(): string {
		return 'bg-dark text-white';
	}
}
