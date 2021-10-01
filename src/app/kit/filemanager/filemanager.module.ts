import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FileUploadModule } from 'ng2-file-upload';
import { FileService } from './services/file.service';
import { EmbedAudioComponent } from './components/embed-audio/embed-audio.component';
import { EmbedVideoComponent } from './components/embed-video/embed-video.component';
import { EmbedYoutubeComponent } from './components/embed-youtube/embed-youtube.component';
import { EmbedFileComponent } from './components/embed-file/embed-file.component';
import { HtmlModule } from '../html/html.module';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		EmbedAudioComponent,
		EmbedVideoComponent,
		EmbedYoutubeComponent,
		EmbedFileComponent,
		UploadFileComponent,
	],
	imports: [
		CommonModule,
		HtmlModule,
		TranslateModule,
		// forms
		FormsModule,
		ReactiveFormsModule,
		// others
		PdfViewerModule,
		FileUploadModule,
	],
	exports: [
		EmbedAudioComponent,
		EmbedVideoComponent,
		EmbedYoutubeComponent,
		EmbedFileComponent,
		UploadFileComponent,
	],
})
export class FilemanagerModule {
	static forRoot() {
		return {
			ngModule: FilemanagerModule,
			providers: [FileService],
		};
	}
}
