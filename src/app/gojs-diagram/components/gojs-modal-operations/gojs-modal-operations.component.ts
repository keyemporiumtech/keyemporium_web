import { Component } from '@angular/core';
import { BaseModalComponent } from '@ddc/kit';

@Component({
	selector: 'gojs-cmp-gojs-modal-operations',
	templateUrl: './gojs-modal-operations.component.html',
	styleUrls: ['./gojs-modal-operations.component.scss'],
})
export class GojsModalOperationsComponent extends BaseModalComponent {
	// ------------------- MANAGE VALIDATIONS
	messages: string[] = [];

	// ----------- MESSAGES
	setMessage(message: string): void {
		this.messages.push(message);
	}
	setMessages(messages: string[]): void {
		this.messages.push(...messages);
	}
	emptyMessages() {
		this.messages.length = 0;
	}

	hasMessage(): boolean {
		return this.messages.length > 0;
	}
}
