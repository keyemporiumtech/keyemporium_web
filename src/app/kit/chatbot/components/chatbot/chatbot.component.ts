import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../../../abstract/base.component';
import { JsUtility } from '../../../config/utility/js.utility';
import { TypCssLoading } from '../../../html/components/loading/loading.component';
import { ApplicationLoggerService } from '../../../logger/services/application-logger.service';
import { StringTranslate } from '../../../translation/models/string-translate.model';
import { ChatbotMessageInterface } from '../../interfaces/chatbot-message.interface';

@Component({
	selector: 'ddc-init-chatbot',
	templateUrl: './chatbot.component.html',
	styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent extends BaseComponent {
	showChatbot: boolean;
	showChatLoading: boolean;

	// style
	@Input() toggleBackground: string;
	@Input() toggleText: string;
	@Input() themeColor: string = '#724ae8';
	@Input() chatbotBackground: string = '#fff';
	@Input() chatbotText: string = '#fff';
	@Input() chatbotImage: string;
	@Input() chatbotIcon: string = 'user';
	@Input() textStyle: any = {
		chbBkg: '#724ae8',
		chbCol: '#fff',
		reqBkg: '#f2f2f2',
		reqCol: '#000',
		errBkg: '#f8d7da',
		errCol: '#721c24',
	};
	// other
	@Input() name: string = 'Chatbot';
	@Input() placeholderText: string | StringTranslate = 'Enter a message...';
	@Input() typeLoading: TypCssLoading = TypCssLoading.FACEBOOK;
	private _messages: ChatbotMessageInterface[] = [];
	@Input() set messages(initials: ChatbotMessageInterface[]) {
		this._messages.unshift(...initials);
	}
	get messages(): ChatbotMessageInterface[] {
		return this._messages;
	}
	@Input() templateResults: any;

	// --- textarea
	@ViewChild('textInput', { static: false }) textInput: ElementRef;
	@Output() onCall: EventEmitter<string> = new EventEmitter<string>();
	isInShift: boolean;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}
	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'ChatbotComponent';
	}

	openClose() {
		this.showChatbot = !this.showChatbot;
	}

	sendRequest() {
		const message: ChatbotMessageInterface = {
			type: 'OUT',
			value: this.textInput.nativeElement.value,
		};

		this.textInput.nativeElement.value = '';
		setTimeout(() => {
			this.textInput.nativeElement.value = '';
			JsUtility.moveCursor(this.textInput.nativeElement, 0);
		}, 500);

		this.messages.push(message);
		this.callService(message.value);
	}

	callService(text: string) {
		if (text) {
			this.onCall.emit(text);
			this.showChatLoading = true;
			this.scrollChatbotEnd();
		}
	}
	receiveService(message: ChatbotMessageInterface) {
		if (message) {
			this.messages.push(message);
		}
		this.showChatLoading = false;
		this.scrollChatbotEnd();
	}

	// -------- textarea
	manageKeydownTextarea(event) {
		if (event.key === 'Shift') {
			this.isInShift = true;
		} else if (event.key === 'Enter' && !this.isInShift) {
			this.sendRequest();
		}
	}
	manageKeyupTextarea(event) {
		if (event.key === 'Shift' && this.isInShift) {
			this.isInShift = false;
		}
	}

	private scrollChatbotEnd() {
		setTimeout(() => {
			const chatbox = document.querySelector('.chatbox');
			chatbox.scrollTo(0, chatbox.scrollHeight);
		}, 500);
	}
}
