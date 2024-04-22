import { Component, ViewChild, OnDestroy } from '@angular/core';
import {
	ChatbotComponent,
	ChatbotMessageInterface,
	ChatbotUtility,
	StackOverflowService,
} from '@ddc/kit';
import { Subscription } from 'rxjs';

@Component({
	selector: 'wiki-test-kit-chatbot',
	templateUrl: './test-kit-chatbot.component.html',
	styleUrls: ['./test-kit-chatbot.component.scss'],
})
export class TestKitChatbotComponent implements OnDestroy {
	flgChatbot1: boolean;
	flgChatbot2: boolean;
	flgChatbot3: boolean;
	flgChatbot4: boolean;

	messages: ChatbotMessageInterface[] = [
		{ type: 'IN', value: 'Sono il tuo assistente. Come posso aiutarti ?' },
	];

	@ViewChild('chatbot1') chatbot1: ChatbotComponent;
	@ViewChild('chatbot2') chatbot2: ChatbotComponent;
	styleChatbot2: any = {
		chbBkg: 'green',
		chbCol: 'white',
		reqBkg: 'gray',
		reqCol: 'black',
		errBkg: 'darkred',
		errCol: 'white',
	};

	@ViewChild('chatbot3') chatbot3: ChatbotComponent;
	@ViewChild('template1') template1: any;
	@ViewChild('template2') template2: any;
	templateCurrent: any;

	@ViewChild('chatbot4') chatbot4: ChatbotComponent;

	subAsk: Subscription;

	// ------ STACK OVERFLOW
	flgChatbotStackOverflow: boolean;
	@ViewChild('chatbotStackOverflow') chatbotStackOverflow: ChatbotComponent;
	@ViewChild('templateStackOverflow') templateStackOverflow: any;
	listMessagesStackOverflow: ChatbotMessageInterface[] = [];
	showErrorAsk: boolean;

	constructor(private stackOverflowService: StackOverflowService) {}

	ask1(text: string, chatbot: ChatbotComponent, html?: boolean) {
		let $obs;
		if (Math.random() >= 0.5) {
			$obs = html
				? ChatbotUtility.exampleResHtml(text, 'IN')
				: ChatbotUtility.exampleRes(text, 'IN');
		} else {
			$obs = html
				? ChatbotUtility.exampleResHtml(text, 'ERROR')
				: ChatbotUtility.exampleRes(text, 'ERROR');
		}

		setTimeout(() => {
			this.subAsk = $obs.subscribe((message) => {
				chatbot.receiveService(message);
			});
		}, 3000);
	}

	ask2(text: string, chatbot: ChatbotComponent) {
		setTimeout(() => {
			let message = undefined;
			if (Math.random() >= 0 && Math.random() <= 0.3) {
				this.templateCurrent = this.template1;
				message = undefined;
			} else if (Math.random() > 0.3 && Math.random() <= 0.6) {
				this.templateCurrent = this.template2;
				message = undefined;
			} else {
				this.templateCurrent = undefined;
				message = { type: 'IN', value: 'Nessun template in questo caso random' };
			}
			chatbot.receiveService(message);
		}, 3000);
	}

	viewChatbot(num: number | string, flag: boolean) {
		this['flgChatbot' + num] = flag;
	}

	ngOnDestroy(): void {
		if (this.subAsk) {
			this.subAsk.unsubscribe();
		}
	}

	// ---- STACK OVERFLOW
	askStackOverflow(text?: string) {
		if (text) {
			this.listMessagesStackOverflow.length = 0;
			this.subAsk = this.stackOverflowService
				.ask(text, { page: 1, pagesize: 5, site: this.showErrorAsk ? 'xxx' : 'stackoverflow' })
				.subscribe((res) => {
					this.listMessagesStackOverflow = res;
					this.chatbotStackOverflow.receiveService(undefined);
				});
		}
	}
}
