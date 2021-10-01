import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class ChatModule {
	static forRoot() {
		return {
			ngModule: ChatModule,
			providers: [],
		};
	}
}
