import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { HtmlModule } from '../html/html.module';
import { TranslateModule } from '@ngx-translate/core';
import { StackOverflowService } from './external/stack-overflow/services/stack-overflow.service';

@NgModule({
	declarations: [ChatbotComponent],
	imports: [CommonModule, TranslateModule, HtmlModule],
	exports: [ChatbotComponent],
})
export class ChatbotModule {
	static forRoot() {
		return {
			ngModule: ChatbotModule,
			providers: [StackOverflowService],
		};
	}
}
