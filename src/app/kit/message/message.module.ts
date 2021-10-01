import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from './services/message.service';

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class MessageModule {
	static forRoot() {
		return {
			ngModule: MessageModule,
			providers: [],
		};
	}
}
