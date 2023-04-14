import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { QuillComponent } from './components/quill/quill.component';

@NgModule({
	declarations: [QuillComponent],
	imports: [CommonModule, QuillModule],
	exports: [QuillComponent],
})
export class QuillEditorModule {
	static forRoot() {
		return {
			ngModule: QuillEditorModule,
			providers: [],
		};
	}
}
