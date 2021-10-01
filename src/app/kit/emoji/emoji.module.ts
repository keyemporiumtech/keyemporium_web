import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlModule } from '../html/html.module';
import { InputEmojiComponent } from './components/input-emoji/input-emoji.component';
import { EmojiUtilService } from './services/emoji-util.service';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [InputEmojiComponent],
	imports: [CommonModule, HtmlModule, FormsModule],
	exports: [InputEmojiComponent],
})
export class EmojiModule {
	static forRoot() {
		return {
			ngModule: EmojiModule,
			providers: [EmojiUtilService],
		};
	}
}
