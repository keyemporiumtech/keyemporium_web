import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploadModule } from 'ng2-file-upload';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HtmlModule } from '../html/html.module';
import { DownloadFileComponent } from './components/download-file/download-file.component';
import { EmbedAudioComponent } from './components/embed-audio/embed-audio.component';
import { EmbedFileComponent } from './components/embed-file/embed-file.component';
import { EmbedVideoComponent } from './components/embed-video/embed-video.component';
import { EmbedYoutubeComponent } from './components/embed-youtube/embed-youtube.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { FileService } from './services/file.service';

@NgModule({
	declarations: [
		EmbedAudioComponent,
		EmbedVideoComponent,
		EmbedYoutubeComponent,
		EmbedFileComponent,
		UploadFileComponent,
		DownloadFileComponent,
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
		DownloadFileComponent,
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
