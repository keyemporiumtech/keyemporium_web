import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnumMessageType, MessageModel, MessageService, RouteUrlModel } from '@ddc/kit';
import { environment } from '../../../../../environments/environment';
import { BehaviourMessageModel } from '@ddc/rest';

@Component({
	selector: 'wiki-test-commons-page-message',
	templateUrl: './test-commons-page-message.component.html',
	styleUrls: ['./test-commons-page-message.component.scss'],
})
export class TestCommonsPageMessageComponent implements OnInit {
	EnumMessageType = EnumMessageType;
	constructor(private messageService: MessageService, private router: Router) {}

	ngOnInit() {}

	// MODAL
	modal(type: EnumMessageType, code?: number) {
		const message = new MessageModel(
			type,
			code,
			'titolo',
			'testo del messaggio',
			'eccezione del messaggio',
		);
		this.messageService.sendSubjectMessage(message, environment.messages.idMessageModal);
	}
	behaviourModal(type: EnumMessageType, idMessage?: string, code?: number) {
		const message = new MessageModel(
			type,
			code,
			'titolo',
			'testo del messaggio',
			'eccezione del messaggio',
		);
		const behaviour = new BehaviourMessageModel(this.messageService, {
			subject: {
				flg: true,
				idComponent: idMessage ? idMessage : environment.messages.idMessagePrincipal,
			},
			routing: undefined,
		});
		behaviour.evalMessage(undefined, message);
	}

	// DIV
	div(type: EnumMessageType, code?: number) {
		const message = new MessageModel(
			type,
			code,
			'titolo',
			'testo del messaggio',
			'eccezione del messaggio',
		);
		this.messageService.sendSubjectMessage(message, environment.messages.idMessageDiv);
	}
	behaviourDiv(type: EnumMessageType, idMessage?: string, code?: number) {
		const message = new MessageModel(
			type,
			code,
			'titolo',
			'testo del messaggio',
			'eccezione del messaggio',
		);
		const behaviour = new BehaviourMessageModel(this.messageService, {
			subject: {
				flg: true,
				idComponent: idMessage ? idMessage : environment.messages.idMessageDiv,
			},
			routing: undefined,
		});
		behaviour.evalMessage(undefined, message);
	}

	// ROUTING
	routing(type: EnumMessageType, code?: number) {
		const message = new MessageModel(
			type,
			code,
			'titolo',
			'testo del messaggio',
			'eccezione del messaggio',
		);
		this.messageService.sendRoutingMessage(
			message,
			new RouteUrlModel(this.router.url + '?view=COMMONS-PAGES-MESSAGES'),
		);
	}
}
